// http://localhost:8091/todos
// Hämta element

console.log("Welcome to the Todolist");

(function () {    

    requestList(); // Skriver ut listan

    function reqListener() {

        document.querySelector("tbody").innerHTML = '';
        // if(!!document.querySelector("tbody"))
        // {
        //     document.querySelector("tbody").remove();
        //     // document.getElementById("ulContent").innerHTML = '';
        // }  
      
        const data = JSON.parse(this.responseText);
        renderList(data.data);    
    }

    function renderList(data) {

    const contentEl = document.getElementById("content");

    if(!!document.getElementById("pInfo"))
    {
        document.getElementById("pInfo").remove();
    }  
    
    const pInfo = document.createElement('p');
    pInfo.setAttribute('id', 'pInfo')
    pInfo.textContent = "Todos in your list: " + data.length;
    contentEl.appendChild(pInfo);

    const tBodyEl = document.querySelector("tbody");
        for(i =0; i < data.length; i++) 
        {
            var trEl = document.createElement('tr');
            tBodyEl.appendChild(trEl);       

            let tdElTitle = document.createElement('td');
            tdElTitle.textContent = data[i].title;

            let tdElAmount = document.createElement('td');
            tdElAmount.textContent = data[i].amount + " pieces";
            
            let tdElDelete = document.createElement('td');
            let btnEl = document.createElement('button');
                btnEl.setAttribute('data-id', data[i].id);
                btnEl.addEventListener("click", onClickDelete);
                btnEl.style = "padding:8px;margin:5px; color:white; background-color:red;";
                btnEl.textContent = "delete";  

            let tdElUpdate = document.createElement('td');
            let btnElUpdate = document.createElement('button');
            btnElUpdate.textContent = "update";
                // btnEl.setAttribute('data-id', data[i].id);
                // btnEl.addEventListener("click", onClickDelete);

            

            trEl.appendChild(tdElTitle);
            trEl.appendChild(tdElAmount);
            trEl.appendChild(tdElUpdate);
            tdElUpdate.appendChild(btnElUpdate)
            trEl.appendChild(tdElDelete);
            tdElDelete.appendChild(btnEl);

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
        const amountEl = document.getElementById("amount");

        const ob = 
                { 
                    title: titleEl.value, 
                    amount: amountEl.value 
                };

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

