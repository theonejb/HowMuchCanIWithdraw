const $ = require('jquery');

$(() => {
    $("form").on("submit", (e) => {
        let balanceVal = $("#balance").val();
        let fixedFeesVal = $("#fixed-fees").val();
        let percentageFeesVal = $("#percentage-fees").val();

        let balance = parseFloat(balanceVal);
        let fixedFees = parseFloat(fixedFeesVal);
        let percentageFees = parseFloat(percentageFeesVal);

        let balanceAfterFixed = balance - fixedFees;
        let balanceAfterPercentage = balanceAfterFixed - (balance * (percentageFees / 100.0));

        $("#withdrawal-amount").html(`${balanceAfterPercentage.toFixed(2)}`);
        $("#withdrawal-amount").parent().removeClass("hidden");

        e.preventDefault();
        return false;
    });

    $("#what-is-this-toggle").on("click", () => {
        $("#what-is-this").toggle();
    });
});