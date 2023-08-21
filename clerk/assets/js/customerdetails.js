let customerId = null;
let firstNameField = document.getElementById("f1");
let lastNameField = document.getElementById("f4");
let genderField = document.getElementById("f2");
let numberField = document.getElementById("f3");
let addressField = document.getElementById("f5");

window.onload = function() {
    customerId = sessionStorage.getItem("customerId");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            json = JSON.parse(xhttp.responseText);
            console.log(json.responseData);
            firstNameField.value = json.responseData[0]["firstName"];
            lastNameField.value = json.responseData[0]["lastName"];
            genderField.value = json.responseData[0]["gender"];
            numberField.value = json.responseData[0]['mobileNumber'];
            addressField.value = json.responseData[0]["address"];
        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/viewcustomer/"+customerId, true);
    xhttp.send();
};


let savebutton = document.getElementById('savebutton');
let readonly = true;
let inputs = document.querySelectorAll('input[type="text"]');
savebutton.addEventListener('click',function(){

    for (let i=0; i<inputs.length; i++) {
        inputs[i].toggleAttribute('readonly');
    }

    if (savebutton.innerHTML === "edit") {
        savebutton.innerHTML = "save";
    } else {
        let json = JSON.stringify({
            "customerId" : customerId,
            "firstName" : firstNameField.value,
            "lastName" : lastNameField.value,
            "gender" : genderField.value,
            "mobileNumber" : numberField.value,
            "address" : addressField.value
        } )
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                window.location.reload();
            }
        };
        xhttp.open("PUT", "http://localhost:8080/LoanAutomationSystem/rest/customer/update", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(json);
        savebutton.innerHTML = "edit";
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