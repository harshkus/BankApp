const registerButton = document.getElementById("register-final");
const RegisterErrorMsg = document.getElementById("register-error-msg");
const RegisterSuccessMsg = document.getElementById("register-success-msg");
const nameInput = document.getElementById("input1");
const passwordInput = document.getElementById("input2");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    var data = JSON.stringify({"userName" : nameInput.value, "password" : passwordInput.value});
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if(this.status === 200){
            RegisterSuccessMsg.style.opacity = 1;
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if(xhr.status === 200){
                    let json1 = JSON.parse(xhr.responseText);
                    let jAdd = JSON.stringify({"customerId":json1.responseData});
                    //
                    let xinn = new XMLHttpRequest();
                    xinn.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/customer/addcustomer", true);
                    xinn.setRequestHeader("Accept", "application/json");
                    xinn.setRequestHeader("Content-Type", "application/json");
                    xinn.send(jAdd);
                    //
                }
            };
            xhr.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/customer/login", true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            const timeDirect = setTimeout(function () {
                // Redirect to another page after 5 seconds
                window.location.href = "home.html";
            }, 2000); // 5000 milliseconds = 5 seconds
        }else{
            RegisterErrorMsg.style.opacity = "1";
        }
    };
    xhttp.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/customer/register", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
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

