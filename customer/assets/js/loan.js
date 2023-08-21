let loanTypeStored = null;
let customerId = null;
const loanType = document.getElementById("form_loan");
let applyButton = document.getElementById("apply_button");
let form = document.getElementById("form");
let firstNameField = document.getElementById("form_fname");
let lastNameField = document.getElementById("form_lname");
let numberField = document.getElementById("form_number");
let addressField = document.getElementById("form_address");
let interestRate = null;
const imageList = document.getElementById('image-list');


window.onload = function () {
    loanTypeStored = sessionStorage.getItem("loanType");
    customerId = sessionStorage.getItem("customerId");
    interestRate = sessionStorage.getItem("interest");
    loanType.value = loanTypeStored;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            json = JSON.parse(xhttp.responseText);
            if (json.responseData[0]["firstName"])
                firstNameField.value = json.responseData[0]["firstName"];
            if(json.responseData[0]["lastName"])
                lastNameField.value = json.responseData[0]["lastName"];
            if(json.responseData[0]['mobileNumber'])
                numberField.value = json.responseData[0]['mobileNumber'];
            if(json.responseData[0]["address"])
                addressField.value = json.responseData[0]["address"];
        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/viewcustomer/"+customerId, true);
    xhttp.send();
}

function createImageElement(src) {
    const img = new Image();
    img.src = src;
    img.alt = 'Uploaded Image';
    img.style.maxWidth = '100%';
    return img;
}

function handleImageUpload(event) {
    imageList.innerHTML = "";
    const file = event.target.files[0];
    if (file.type.includes('image/jpeg')) {
        const img = createImageElement(URL.createObjectURL(file));
        const li = document.createElement('li');
        li.appendChild(img);
        imageList.appendChild(li);
    } else {
        alert(`Skipped ${file.name} - Only JPG images are allowed.`);
    }
}


applyButton.addEventListener("click", ev => {

    const loanAmount = document.getElementById("form_amount").value;
    const repaymentDuration = document.getElementById("form_tenure").value;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, repaymentDuration);
    const denominator = Math.pow(1 + monthlyInterestRate, repaymentDuration) - 1;
    const emi = (loanAmount * (numerator / denominator)).toFixed(2);


    const imgElement = document.getElementById('image-input');
    const file = imgElement.files[0]
    const reader = new FileReader()
    reader.addEventListener(
        'load',
        function () {
            let json = JSON.stringify({
                "customerId" : customerId,
                "loanType" : loanTypeStored,
                "loanAmount" : document.getElementById("form_amount").value,
                "emi" : emi,
                "tenure" : document.getElementById("form_tenure").value,
                "interest" : interestRate,
                "document" : reader.result
            })
            const req = new XMLHttpRequest()
            req.onreadystatechange = () =>{
                if (req.status === 200 && req.readyState === 4) {
                    window.location.href = "loanapplication.html";
                }
            }
            req.open('POST','http://localhost:8080/LoanAutomationSystem/rest/customer/addloanapplication',true)
            req.setRequestHeader("Content-Type", "application/json")
            req.send(json)
        }
    )
    reader.readAsDataURL(file)
});

function sendAsyncRequest(httpMethodName, url, callbackFn,  reqBodyData = undefined) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function () {
        if (req.status === 200 && req.readyState === 4) {
            if(callbackFn){
                callbackFn(JSON.parse(req.responseText))
            }
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
        window.location.replace("../index.html");
    }
})