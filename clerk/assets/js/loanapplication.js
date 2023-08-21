let dataTable = document.getElementById("datatable");
let customerId = null;
const columnOrder = ["applicationId", "customerId", "loanType", "loanAmount", "status", "date", "interest", "tenure"];
const searchCriteriaSelect = document.getElementById("searchCriteria");
const inputContainer = document.getElementById("inputContainer");
const searchButton = document.getElementById("searchButton");


window.onload = function (){
    customerId = sessionStorage.getItem("customerId");
    searchCriteriaSelect.selectedIndex = 0;
    sendAsyncRequest('GET',
        "http://localhost:8080/LoanAutomationSystem/rest/clerk/applications",
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

function createInputField(selectedCriteria) {
    inputContainer.innerHTML = "";
    if (selectedCriteria === "loanType") {
        const dropdownInput = document.createElement("select");
        // Populate dropdown options based on your data
        dropdownInput.innerHTML = `
            <option value="PersonalLoan">Personal Loan</option>
            <option value="CarLoan">Car Loan</option>
            <option value="HomeLoan">Home Loan</option>
            <option value="EducationLoan">Education Loan</option>
          `;
        inputContainer.appendChild(dropdownInput);
    } else if (selectedCriteria === "applicationId"){
        const textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder", "Enter search value");
        inputContainer.appendChild(textInput);
    } else if (selectedCriteria === "customerId"){
        const textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder", "Enter search value");
        inputContainer.appendChild(textInput);
    } else {
        const dropdownInput = document.createElement("input");
        dropdownInput.setAttribute("type", "date");
        inputContainer.appendChild(dropdownInput);
    }
}

searchCriteriaSelect.addEventListener("change", function () {
    const selectedCriteria = searchCriteriaSelect.value;
    createInputField(selectedCriteria);
});

searchButton.addEventListener("click", function () {
    const selectedCriteria = searchCriteriaSelect.value;
    let searchInputValue;

    if (selectedCriteria === "date") {
        const dropdownInput = inputContainer.querySelector("input");
        searchInputValue = dropdownInput.value;
        let parts = searchInputValue.split("-");
        let year = parts[0];
        let month = parts[1];
        let day = parts[2];
        let formattedDate = day + "-" + month + "-" + year.slice(-2);
        sendAsyncRequest('GET',
            "http://localhost:8080/LoanAutomationSystem/rest/clerk/loanapplicationsbydate/"+formattedDate,
            populateTable)
    } else if (selectedCriteria === "applicationId"){
        const dropdownInput = inputContainer.querySelector("input");
        searchInputValue = dropdownInput.value;
        sendAsyncRequest('GET',
            "http://localhost:8080/LoanAutomationSystem/rest/clerk/getloanapplication/"+searchInputValue,
            populateTable)
    } else if (selectedCriteria === "customerId"){
        const dropdownInput = inputContainer.querySelector("input");
        searchInputValue = dropdownInput.value;
        sendAsyncRequest('GET',
            "http://localhost:8080/LoanAutomationSystem/rest/clerk/getapplication/"+searchInputValue,
            populateTable)
    } else {
        const dropdownInput = inputContainer.querySelector("select");
        searchInputValue = dropdownInput.value;
        sendAsyncRequest('GET',
            "http://localhost:8080/LoanAutomationSystem/rest/clerk/loanapplications/"+searchInputValue,
            populateTable)
    }
});

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("../index.html");
    }
})

