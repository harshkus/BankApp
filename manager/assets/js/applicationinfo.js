let applicationId = null;
let approveButton = document.getElementById("approve_button");
let rejectButton = document.getElementById("reject_button");
let applicationJson = null;
let buttonDiv = document.getElementById("button_div");
let imageList = document.getElementById("image-list");

window.onload = function (){
    applicationId = sessionStorage.getItem("applicationId");
    document.getElementById("application_id").value = applicationId;
    sendAsyncRequest('GET',
        'http://localhost:8080/LoanAutomationSystem/rest/clerk/getloanapplication/'+applicationId,
        fill)
};

function createImageElement(src) {
    const img = new Image();
    img.src = src;
    img.alt = 'Uploaded Image';
    img.style.maxWidth = '100%';
    return img;
}

let fill = function (data) {
    applicationJson = (data.responseData)[0];
    document.getElementById("application_id").value = applicationJson.applicationId;
    document.getElementById("customer_id").value = applicationJson.customerId;
    document.getElementById("loan_type").value = applicationJson.loanType;
    document.getElementById("loan_amount").value = applicationJson.loanAmount;
    document.getElementById("status").value = applicationJson.status;
    document.getElementById("date").value = applicationJson.date;
    document.getElementById("interest").value = applicationJson.interest;
    document.getElementById("tenure").value = applicationJson.tenure;
    const img = createImageElement(applicationJson.document);
    const li = document.createElement('li');
    li.appendChild(img);
    imageList.appendChild(li);
    if(applicationJson.status === 'Pending'){
        buttonDiv.style.opacity = "1";
    }
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

approveButton.addEventListener("click", (e) => {
    var result = confirm("Want to approve?");
    if (result) {
        applicationJson["status"] = "Approved";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.href = "home.html";
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
        applicationJson["status"] = "Rejected";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.href = "home.html";
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
        window.location.replace("../index.html");
    }
})

