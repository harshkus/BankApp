const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("sign-in");
const loginErrorMsg = document.getElementById("login-error-msg");
const registerIndexPageButton = document.getElementById("register-indexpage");
const nameInput = document.getElementById("input1");
const passwordInput = document.getElementById("input1");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("customerId", "1");
    window.location.replace("customer/home.html");
    var data = JSON.stringify({"userName" : nameInput.value, "password" : passwordInput.value});
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        // if(this.status === 200){
        //
        //     window.location.replace("customer/home.html");
        // }else{
        //     loginErrorMsg.style.opacity = 1;
        // }
        let json = JSON.parse(xhttp.responseText);
        console.log(json);
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/login?data="+encodeURIComponent(data), true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
})

registerIndexPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "register.html";
})

