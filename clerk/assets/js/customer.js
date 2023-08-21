let dataTable = document.getElementById("datatable").getElementsByTagName("tbody")[0];
const columnOrder = ["customerId", "firstName", "lastName"];

window.onload = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(xhttp.responseText);
            console.log(json);
            json["responseData"].forEach(function (item){
                let reorderedRowData = columnOrder.map(column => item[column]);
                let tr = dataTable.insertRow();
                tr.addEventListener('click',function(){
                    sessionStorage.setItem("customerId", item.customerId);
                    window.location.href = "customerdetails.html";
                });
                tr.classList.add("clickable-row");
                for(let key in reorderedRowData){
                    let cell = tr.insertCell();
                    cell.innerHTML = reorderedRowData[key];
                }
            })

        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/clerk/customers", true);
    xhttp.send();
};

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("../index.html");
    }
})