let applicationId = null;
let approveButton = document.getElementById("approve_button");
let rejectButton = document.getElementById("reject_button");
let applicationJson = null;

window.onload = function (){
    applicationId = sessionStorage.getItem("applicationId");
    document.getElementById("application_id").value = applicationId;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            applicationJson = (JSON.parse(xhttp.responseText))["responseData"];
        }
    };
    xhttp.open( "GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/getloanapplication/" + applicationId, true);
    xhttp.send();
};

approveButton.addEventListener("click", (e) => {
    var result = confirm("Want to approve?");
    if (result) {
        applicationJson["status"] = "approved";
        console.log(JSON.stringify(applicationJson));
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.reload();
            }
        };
        xhttp.open( "PUT", "http://localhost:8080/LoanAutomationSystem/rest/manager/setStatus", true);
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

