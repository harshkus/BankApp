let deleteButton = document.getElementById("delete_button");
let applicationId = null;

window.onload = function (){
    applicationId = sessionStorage.getItem("applicationId");
    document.getElementById("application_id").value = applicationId;
};

deleteButton.addEventListener("click", (e) => {
    var result = confirm("Want to delete?");
    if (result) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                sessionStorage.removeItem("applicationId");
                window.location.replace("loanapplication.html");
            }
        };
        xhttp.open( "DELETE", "http://localhost:8080/LoanAutomationSystem/rest/customer/deleteapplication/"+applicationId, true);
        xhttp.send();
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

