let loanTypeStored = null;
const loanType = document.getElementById("form_loan");
let applyButton = document.getElementById("apply_button");
let form = document.getElementById("form");

window.onload = function () {
    loanTypeStored = sessionStorage.getItem("loanType");
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
    let data = {
        "customerId" : document.getElementById("form_id").value,
        "loanType" : loanTypeStored,
        "loanAmount" : document.getElementById("form_amount").value
    }

    let pageReload = function (){
        window.location.href = "loanapplication.html";
    }

    sendAsyncRequest('POST',
        "http://localhost:8080/LoanAutomationSystem/rest/customer/addloanapplication",
        pageReload,
        data);
})

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("index.html");
    }
})

let getId = document.getElementById("get_id");

getId.addEventListener("click", ev => {
    let username = document.getElementById("form_username").value;
    if (username === "") {
        ev.preventDefault();
        alert("Enter Username");
    } else{
        let addId = function (data) {
            if( data.responseData === -1){
                document.getElementById("username_error_msg").style.opacity = "1";
            }else{
                let customerId = document.getElementById("form_id");
                customerId.value = data.responseData;
            }
        }
        sendAsyncRequest('GET',
            "http://localhost:8080/LoanAutomationSystem/rest/clerk/getcustomerid/"+username,
            addId)
    }
});

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
    else{
        req.send();
    }
}