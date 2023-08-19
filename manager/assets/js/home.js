let dataTable = document.getElementById("datatable").getElementsByTagName("tbody")[0];
let customerId = null;
const columnOrder = ["applicationNo", "customerId", "loanType", "loanAmount", "status", "remarks", "balance"];

window.onload = function() {
    customerId = sessionStorage.getItem("customerId");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(xhttp.responseText);
            var i = 0;
            json.responseData.forEach(function (item){
                let reorderedRowData = columnOrder.map(column => item[column]);
                let tr = dataTable.insertRow(i++);
                tr.addEventListener('click',function(){
                    sessionStorage.setItem("applicationId", item.applicationNo);
                    window.location.href = "applicationinfo.html";
                });
                tr.classList.add("clickable-row");
                var j=0;
                for(let key in reorderedRowData){
                    let cell = tr.insertCell(j++);
                    cell.innerHTML = reorderedRowData[key];
                }
            })
        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/manager/applications", true);
    xhttp.send();
};

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("index.html");
    }
})