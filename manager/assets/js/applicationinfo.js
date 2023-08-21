let applicationId = null;
let approveButton = document.getElementById("approve_button");
let rejectButton = document.getElementById("reject_button");
let applicationJson = null;
let buttonDiv = document.getElementById("button_div");

window.onload = function (){
    applicationId = sessionStorage.getItem("applicationId");
    document.getElementById("application_id").value = applicationId;
    // document.getElementById("customer_id")

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            applicationJson = (JSON.parse(xhttp.responseText))["responseData"];
            document.getElementById("customer_id").value = applicationJson["customerId"];
            document.getElementById("loan_type").value = applicationJson["loanType"];
            document.getElementById("loan_amount").value = applicationJson["loanAmount"];
            document.getElementById("status").value = applicationJson["status"];
            document.getElementById("remarks").value = applicationJson["remarks"];
            document.getElementById("balance").value = applicationJson["balance"];
            if(applicationJson["status"] === "approved" || applicationJson["status"] === "rejected"){
                buttonDiv.style.opacity = "0";
            }
        }
    };
    xhttp.open( "GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/getloanapplication/" + applicationId, true);
    xhttp.send();
};

approveButton.addEventListener("click", (e) => {
    var result = confirm("Want to approve?");
    if (result) {
        applicationJson["status"] = "approved";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.reload();
            }
        };
        xhttp.open( "PUT", "http://localhost:8080/LoanAutomationSystem/rest/manager/setStatus", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(applicationJson));
    }
});

rejectButton.addEventListener("click", (e) => {
    var result = confirm("Want to reject?");
    if (result) {
        applicationJson["status"] = "rejected";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.reload();
            }
        };
        xhttp.open( "PUT", "http://localhost:8080/LoanAutomationSystem/rest/manager/setStatus", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(applicationJson));
    }
});

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("index.html");
    }
})

