let loanTypeStored = null;
let customerId = null;
const loanType = document.getElementById("form_loan");
let applyButton = document.getElementById("apply_button");
let form = document.getElementById("form");

window.onload = function () {
    loanTypeStored = sessionStorage.getItem("loanType");
    customerId = sessionStorage.getItem("customerId");
    loanType.value = loanTypeStored;
}

updateList = function() {
    var input = document.getElementById('fileupload');
    var output = document.getElementById('fileList');
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ul>'+children+'</ul>';
}

applyButton.addEventListener("click", ev => {
    let json = JSON.stringify({
        "applicationNo" : null,
        "customerId" : customerId,
        "loanType" : loanTypeStored,
        "loanAmount" : document.getElementById("form_amount").value,
        "status" : null,
        "remarks" : null,
        "balance" : null
    })
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            window.location.replace("../customer/loanapplication.html");
        }
    };
    xhttp.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/customer/addloanapplication", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(json);
})