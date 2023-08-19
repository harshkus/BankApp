let customerid = null;
let namefield = document.getElementById("f1");
let genderfield = document.getElementById("f2");
let numberfield = document.getElementById("f3");

window.onload = function() {
    customerid = sessionStorage.getItem("customerId");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            json = JSON.parse(xhttp.responseText);
            namefield.value = json.responseData.name;
            genderfield.value = json.responseData.gender;
            numberfield.value = json.responseData.mobileNumber;
        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/customer/viewcustomer/"+customerid, true);
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
            "customerId" : customerid,
            "name" : namefield.value,
            "gender" : genderfield.value,
            "mobileNumber" : numberfield.value
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
        window.location.replace("index.html");
    }
})