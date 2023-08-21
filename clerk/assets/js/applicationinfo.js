let deleteButton = document.getElementById("delete_button");
let applicationId = null;

window.onload = function (){
    applicationId = sessionStorage.getItem("applicationId");
    document.getElementById("application_id").value = applicationId;
    sendAsyncRequest('GET',
        'http://localhost:8080/LoanAutomationSystem/rest/clerk/getloanapplication/'+applicationId,
        fill)
};

let fill = function (data) {
    document.getElementById("application_id").value = (data.responseData[0]).applicationId;
    document.getElementById("customer_id").value = (data.responseData[0]).customerId;
    document.getElementById("loan_type").value = (data.responseData[0]).loanType;
    document.getElementById("loan_amount").value = (data.responseData[0]).loanAmount;
    document.getElementById("status").value = (data.responseData[0]).status;
    document.getElementById("date").value = (data.responseData[0]).date;
    document.getElementById("interest").value = (data.responseData[0]).interest;
    document.getElementById("tenure").value = (data.responseData[0]).tenure;
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

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("index.html");
    }
})

