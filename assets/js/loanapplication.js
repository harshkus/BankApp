let dataTable = document.getElementById("datatable").getElementsByTagName("tbody")[0];

window.onload = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(xhttp.responseText);
            var i = 0;
            json.forEach(function (item){
                let tr = dataTable.insertRow(i++);
                tr.addEventListener('click',function(){
                    window.location.href = "loan.html";
                });
                tr.classList.add("clickable-row");
                tr.setAttribute("href", "loan.html");
                let j = 0;
                for(let key in item){
                    let cell = tr.insertCell(j++);
                    cell.innerHTML = item[key];
                }
            })

        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/loans", true);
    xhttp.send();
};

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace("../index.html");
})