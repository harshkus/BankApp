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
            const timeDirect = setTimeout(function () {
                // Redirect to another page after 5 seconds
                window.location.href = "index.html";
            }, 2000); // 5000 milliseconds = 5 seconds
        }else{
            RegisterErrorMsg.style.opacity = 1;
        }
    };
    xhttp.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/customer/register", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
})

