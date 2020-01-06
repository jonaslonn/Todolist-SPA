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
                inputTitle = document.createElement('input');
                inputTitle.setAttribute('type', 'text');
                inputTitle.setAttribute('id', "inputTitle" + data[i].id);
                inputTitle.setAttribute('value', data[i].title);
                inputTitle.style = "width:100%;";            

            let tdElAmount = document.createElement('td');
                inputAmount = document.createElement('input');
                inputAmount.setAttribute('type', 'number');
                inputAmount.setAttribute('id', "inputAmount" + data[i].id);
                inputAmount.setAttribute('value', data[i].amount);
                tdElAmount.textContent = " pieces";
            
            let tdElDelete = document.createElement('td');
            let btnEl = document.createElement('button');
                btnEl.setAttribute('data-id', data[i].id);
                btnEl.addEventListener("click", onClickDelete);
                btnEl.innerHTML = "<i class='fas fa-trash-alt'></i> Delete";  

            let tdElUpdate = document.createElement('td');
            let btnElUpdate = document.createElement('button');
                btnElUpdate.innerHTML = "<i class='fas fa-exchange-alt'></i>  Update";
                btnElUpdate.setAttribute('data-id', data[i].id);
                btnElUpdate.style ='border-radius:25px;';
                btnElUpdate.addEventListener("click", onClickUpdate);


            trEl.appendChild(tdElTitle);
            tdElTitle.appendChild(inputTitle);
            trEl.appendChild(tdElAmount);
            tdElAmount.prepend(inputAmount);
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


        // Uppdatera todolista
        function onClickUpdate(e) {

            e.preventDefault();

            const putReq = new XMLHttpRequest();
    
            putReq.open("PUT", "/todos/" + this.dataset.id);
            putReq.setRequestHeader("Content-Type", "application/json");

            let newTitle = document.getElementById('inputTitle' + this.dataset.id);
            let newAmount = document.getElementById('inputAmount' + this.dataset.id);

            console.log(this.dataset.id + newTitle.value);
            const newOb = 
                    { 
                        title: newTitle.value, 
                        amount: newAmount.value 
                    };
    
            putReq.send(JSON.stringify(newOb));
            
            requestList();
        }

}())

