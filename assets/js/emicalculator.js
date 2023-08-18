document.getElementById("emi-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const repaymentDuration = parseInt(document.getElementById("repayment-duration").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);

    const monthlyInterestRate = (interestRate / 100) / 12;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, repaymentDuration);
    const denominator = Math.pow(1 + monthlyInterestRate, repaymentDuration) - 1;

    const emi = (loanAmount * (numerator / denominator)).toFixed(2);
    const totalRepayment = (emi * repaymentDuration).toFixed(2);

    document.getElementById("monthly-emi").textContent = emi;
    document.getElementById("total-repayment").textContent = totalRepayment;
});
