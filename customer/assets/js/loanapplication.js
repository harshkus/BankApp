let dataTable = document.getElementById("datatable");
let customerId = null;
const columnOrder = ["applicationId", "customerId", "loanType", "loanAmount", "status", "date", "interest", "tenure"];
const idSearch = document.getElementById("idSearch");
const searchButton = document.getElementById("searchButton");


window.onload = function (){
    customerId = sessionStorage.getItem("customerId");
    sendAsyncRequest('GET',
        "http://localhost:8080/LoanAutomationSystem/rest/customer/getapplication/"+customerId,
        populateTable);
}

function sendAsyncRequest(httpMethodName, url, callbackFn,  reqBodyData = undefined) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function () {
        if (req.status === 200 && req.readyState === 4) {
            callbackFn(JSON.parse(req.responseText))
        }
    }
    req.open(httpMethodName, url, true)

    if (reqBodyData){
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(reqBodyData));
    }
    else
        req.send()
}

function populateTable(json) {
    let tbody = document.createElement("tbody");
    json.responseData.forEach(function (item){
        let reorderedRowData = columnOrder.map(column => item[column]);
        let tr = tbody.insertRow();
        tr.addEventListener('click',function(){
            sessionStorage.setItem("applicationId", item.applicationId);
            window.location.href = "applicationinfo.html";
        });
        tr.classList.add("clickable-row");
        for(let key in reorderedRowData){
            let cell = tr.insertCell();
            cell.innerHTML = reorderedRowData[key];
        }
    })
    dataTable.replaceChild(tbody, dataTable.getElementsByTagName("tbody")[0]);
}

searchButton.addEventListener("click", function () {
    const searchInputValue = idSearch.value;
    sendAsyncRequest('GET',
        'http://localhost:8080/LoanAutomationSystem/rest/customer/getloanapplication/'+searchInputValue,
        populateTable);
});

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    let result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("../index.html");
    }
})

