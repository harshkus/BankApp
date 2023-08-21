let loanTypeStored = null;
const loanType = document.getElementById("form_loan");
let applyButton = document.getElementById("apply_button");
let form = document.getElementById("form");
let interestRate = null;
const imageList = document.getElementById('image-list');

window.onload = function () {
    loanTypeStored = sessionStorage.getItem("loanType");
    loanType.value = loanTypeStored;
    interestRate = sessionStorage.getItem("interest");
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
                "customerId" : document.getElementById("form_id").value,
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
            req.open('POST','http://localhost:8080/LoanAutomationSystem/rest/clerk/addloanapplication',true)
            req.setRequestHeader("Content-Type", "application/json")
            req.send(json)
        }
    )
    reader.readAsDataURL(file)
})

let logoutbutton = document.getElementById("logout-button");
logoutbutton.addEventListener("click", (e) => {
    var result = confirm("Want to Log Out?");
    if (result) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("../index.html");
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