const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("sign-in");
const loginErrorMsg = document.getElementById("login-error-msg");
const nameInput = document.getElementById("input1");
const passwordInput = document.getElementById("input2");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = JSON.stringify({"userName" : nameInput.value, "password" : passwordInput.value});
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let json = JSON.parse(xhttp.responseText);
        if(xhttp.status === 200 && json.responseData){
            window.location.replace("home.html");
        }else{
            loginErrorMsg.style.opacity = "1";
        }
    };
    xhttp.open("POST", "http://localhost:8080/LoanAutomationSystem/rest/clerk/clogin", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
})

