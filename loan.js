// jquery for the loan screen

var loanAmount;
var loanTime;
var loanRate;

$( "form" ).on( "submit", function( event ) {
    console.log( $( "form" ).serializeArray() );
    var formValue = $( "form" ).serializeArray();
    calculateLoan(formValue);
    
    event.preventDefault();
    
  } );



function calculateLoan(formValue) {
    loanAmount = Number(formValue[0].value);
    loanTime = Number(formValue[1].value);
    loanRate= Number(formValue[2].value);
     
    var interestRate = loanRate / 100;

    var monthlyRate = (interestRate / 12);  //i

    var numberOfPayments = loanTime * 12;   //n

    // var nr = monthlyRate * Math.pow((1+monthlyRate), numberOfPayments);
    // var dr = Math.pow((1+monthlyRate), numberOfPayments) - 1;
    // var monthlyPayment = loanAmount * (nr/dr);

    var monthlyPayment = loanAmount * ((monthlyRate * Math.pow((1+monthlyRate), numberOfPayments)) / (Math.pow((1+monthlyRate), numberOfPayments) - 1));

    var totalPayment = monthlyPayment * numberOfPayments;
                
    var totalInterestPaid = totalPayment - loanAmount;

    monthlyPayment = monthlyPayment.toFixed(2);
    totalInterestPaid = totalInterestPaid.toFixed(2);
    totalPayment = totalPayment.toFixed(2);

    debugger;
    
    $("#monthlyPayment").empty();
    $("#totalInterestPaid").empty();
    $("#totalPayment").empty();

    $("#monthlyPayment").append("Your Monthly Payment: $" + monthlyPayment);
    $("#totalPayment").append("Your Total Payment: $" + totalPayment);
    $("#totalInterestPaid").append("Your Total Interest Paid: $" + totalInterestPaid);
    
}