// jquery for the investment screen

var initialInvestment;
var monthlyContribution;
var lengthOfTime;
var estimatedRate;
var compoundFrequency;

$( "form" ).on( "submit", function( event ) {
    console.log( $( "form" ).serializeArray() );
    var formValue = $( "form" ).serializeArray();
    calculateReturn(formValue);
    
    event.preventDefault();
    
  } );



function calculateReturn(formValue) {
    initialInvestment = Number(formValue[0].value);
    monthlyContribution = Number(formValue[1].value);
    lengthOfTime = Number(formValue[2].value);
    estimatedRate = Number(formValue[3].value);
    compoundFrequency = formValue[4].value;

    var totalContribution = (initialInvestment + (monthlyContribution*12*lengthOfTime)).toFixed(2);
    var totalAmount;
    var n;
    //debugger;
    if(compoundFrequency === 'monthly') {
        n = 12;
        for(var i = 1; i <= (lengthOfTime * 12); i++) {

            var rate = estimatedRate / 100;
        
            var rbynValue = rate / n;
    
            var powerValue = n * (1/12);
    
            var newVal = Math.pow((1 + rbynValue), powerValue);
            
            var newInvestment = initialInvestment + monthlyContribution;

            //debugger;
            totalAmount = (newInvestment) * newVal;
    
            initialInvestment = totalAmount;
        }
    } else if(compoundFrequency === 'annully') {
        n = 1;
        for(var i = 1; i <= (lengthOfTime); i++) {

            var rate = estimatedRate / 100;
        
            var rbynValue = rate / n;
    
            var powerValue = n * (1);
    
            var newVal = Math.pow((1 + rbynValue), powerValue);
            
            //debugger;
            totalAmount = (initialInvestment) * newVal + (monthlyContribution*12);
    
            initialInvestment = totalAmount;
        }
    } else {
        n = 365;

        for(var i = 1; i <= (lengthOfTime * 365); i++) {

            var rate = estimatedRate / 100;
        
            var rbynValue = rate / n;
    
            var powerValue = n * (1/365);
    
            var newVal = Math.pow((1 + rbynValue), powerValue);

            var newInvestment = initialInvestment;

            if( i % 30 === 0) {
                newInvestment = initialInvestment + monthlyContribution;
            }
            
            //debugger;
            totalAmount = (newInvestment) * newVal;
    
            initialInvestment = totalAmount;
        }
    }
    

    totalAmount = totalAmount.toFixed(2);
    
    $("#results").empty();

    // $("#results").append("Your Total Return: $" + totalAmount + ". Contribution: $" + totalContribution);
    $("#results").append("Your Total Return: $" + totalAmount);
    
}


