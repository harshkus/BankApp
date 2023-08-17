const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("sign-in");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.email.value;
    const password = loginForm.password.value;

    console.log(username);
    if (username === "user@gmail.com" && password === "user") {
        window.location.replace("customer/home.html");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})