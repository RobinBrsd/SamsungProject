// CENTER FORM MIDDLE OF THE PAGE EN FONCTIONS DE LA TAILLE DE LECRAN //
var height = $(window).height();
$(".form").css('margin-top', height / 8 + 'px');


// ANIMATION / DISPLAY / HIDDEN - FORM // 
const btnInscription = $("#Sign-up-link");
const btnLogin = $('#Sign-in-link');

btnInscription.click(function(){

    $("#inscription").removeClass("hidden");
    $("#login").addClass("hidden");

    $("#inscription").animate({
        opacity: "0"
    }, 0);

    $("#inscription").animate({
        opacity: "1"
    }, 700);

    $("#login").animate({
        opacity: "0"
    }, 700);
});

btnLogin.click(function(){

    $("#login").removeClass("hidden");
    $("#inscription").addClass("hidden");

    $("#login").animate({
        opacity: "1"
    }, 700);

    $("#inscription").animate({
        opacity: "0"
    }, 700);
});