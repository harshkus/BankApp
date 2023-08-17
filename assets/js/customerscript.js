

window.onload = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(xhttp.responseText);
            // let ul = document.getElementById("loan-list");
            // let li = document.createElement(li);
            // li.appendChild(document.createTextNode(xhttp.responseText));
            // ul.appendChild(li);
        }
    };
    xhttp.open("GET", "http://localhost:8080/LoanAutomationSystem/rest/myservices/records", true);
    xhttp.send();
};