var submit = document.getElementById('submit');
var input = document.getElementById('input');
var search = document.getElementsByTagName('label');
var select = document.getElementsByTagName('select');
var arrowa = document.getElementById('a');
var arrowb = document.getElementById('b');
var title = document.getElementsByTagName('h1');
var form = document.getElementsByTagName('form');

function open()
{
    input.classList.toggle("visible-inputs");
    submit.classList.toggle("visible-btn");
    select[0].classList.toggle("visible-btn");
    select[1].classList.toggle("visible-btn");
    search[0].classList.toggle("open");
    arrowa.classList.toggle("arrow-a");
    arrowb.classList.toggle("arrow-b");
    title[0].classList.toggle("visible-title");
    form[0].classList.toggle("visible-form");
}

search[0].addEventListener("click", open);

