// http://localhost:8091/todos
// Hämta element

console.log("Welcome to the Todolist");

(function () {    

    requestList(); // Skriver ut listan

    function reqListener() {

        if(!!document.getElementById("ulContent"))
        {
            document.getElementById("ulContent").remove();
            // document.getElementById("ulContent").innerHTML = '';
        }  
      
        const data = JSON.parse(this.responseText);
        renderList(data.data);    
    }

    function renderList(data) {

    const contentEl = document.getElementById("content");

    const pInfo = document.createElement('p');
    contentEl.textContent = "Antal i din attgöra lista: " + data.length;    

    var ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'ulContent')
    contentEl.appendChild(ulEl);

        for(i =0; i < data.length; i++) 
        {
            console.log("Name: " + data[i].title);                

            let liEl = document.createElement('li');
            liEl.textContent = data[i].id + ") " + data[i].title;
            
            let btnEl = document.createElement('button');
            btnEl.setAttribute('data-id', data[i].id);
            btnEl.addEventListener("click", onClickDelete);
            btnEl.style = "margin:5px; color:white; background-color:red;";
            btnEl.textContent = "delete";


            ulEl.appendChild(liEl);
            liEl.appendChild(btnEl);

        }
    }

    function requestList() {

        const req = new XMLHttpRequest();
    
        req.addEventListener("load", reqListener);
        req.open("GET", "/todos");
        req.send(); 

    }


    // Skapa ny todo
    const formEl = document.querySelector("form");

    function onSubmit(e) {
        e.preventDefault();

        const postReq = new XMLHttpRequest();

        postReq.open("POST", "/todos");
        postReq.setRequestHeader("Content-Type", "application/json");

        const titleEl = document.getElementById("title");

        const ob = { title: titleEl.value };
        postReq.send(JSON.stringify(ob));
        
        requestList();
    }

    formEl.addEventListener("submit", onSubmit);



    
    // Ta bort todo
    function onClickDelete(e) {

        const delReq = new XMLHttpRequest();

        delReq.open("DELETE", "/todos/" + this.dataset.id);
        delReq.send();

        requestList();
    }



    // put post
}())

