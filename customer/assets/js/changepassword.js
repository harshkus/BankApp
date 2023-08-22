const loginErrorMsg = document.getElementById("login-error-msg");
const nameInput = document.getElementById("input1");
const oldPasswordInput = document.getElementById("input2");
const newPasswordInput = document.getElementById("input3");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = JSON.stringify({"userName" : nameInput.value,
                                            "oldPassword" : oldPasswordInput.value,
                                            "newPassword":newPasswordInput.value});
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let json = JSON.parse(xhttp.responseText);
        if(xhttp.status === 200 && json.responseData === true){
            window.location.replace("profile.html");
        }else{
            loginErrorMsg.style.opacity = "1";
        }
    };
    xhttp.open("PUT", "http://localhost:8080/LoanAutomationSystem/rest/customer/reset", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
})

