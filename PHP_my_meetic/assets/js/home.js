
const form = $("#main_form");
const form_login = $("#connection");

$(".open").click(function(){

    form.removeClass("hidden");
    $("#welcome").addClass("hidden");
    form_login.addClass("hidden");

    form.animate({
        opacity: "1"
    }, 600);

    form_login.animate({
        opacity: "0"
    }, 600);

});

$("#connect").click(function(){

    form_login.removeClass("hidden");
    form.addClass("hidden");
    $("#welcome").addClass("hidden");

    form_login.animate({
        opacity: "1"
    }, 600);

    form.animate({
        opacity: "0"
    }, 600);
});