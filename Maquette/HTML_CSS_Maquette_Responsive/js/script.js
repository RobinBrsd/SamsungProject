const get = document.getElementsByClassName("header__slider__hidden");
const getDot = document.getElementsByClassName("slider__dot");
const getFlag = document.getElementsByClassName("main__slider-box");

var slideIndex = 0;
var slideFlag = 0;

var width = document.body.clientWidth;

function nextSlide(n)
{
    slideIndex++;
    
    if(slideIndex < get.length)
    {
        var slide = get[slideIndex];
        var prevSlide = get[slideIndex - 1];
    
        var dot = getDot[slideIndex];
        var oldDot = getDot[slideIndex - 1];
        
        prevSlide.classList.remove("visible");       
        slide.classList.add("visible");  
        
        dot.classList.add("slider__dot-crop-red");
        oldDot.classList.remove("slider__dot-crop-red");
    }
    
    if(slideIndex === get.length)
    {
        slideIndex = 0;
        var slide = get[slideIndex];
        var prevSlide = get[get.length - 1];
    
        var dot = getDot[slideIndex];
        var oldDot = getDot[getDot.length - 1];
        
        prevSlide.classList.remove("visible");       
        slide.classList.add("visible");
        
        dot.classList.add("slider__dot-crop-red");
        oldDot.classList.remove("slider__dot-crop-red");
    }
}


function prevSlide()
{
    slideIndex--;
    
    if(slideIndex >= 0)
    {
        var slide = get[slideIndex];
        var prevSlide = get[slideIndex + 1];
    
        var dot = getDot[slideIndex];
        var oldDot = getDot[slideIndex + 1];
        
        prevSlide.classList.remove("visible");       
        slide.classList.add("visible");    
        
        dot.classList.add("slider__dot-crop-red");
        oldDot.classList.remove("slider__dot-crop-red");
    }
    
    if(slideIndex < 0)
    {
        slideIndex = get.length - 1;
        var slide = get[slideIndex];
        var prevSlide = get[0];
        
        var dot = getDot[slideIndex];
        var oldDot = getDot[0];
    
        prevSlide.classList.remove("visible");       
        slide.classList.add("visible");
        
        dot.classList.add("slider__dot-crop-red");
        oldDot.classList.remove("slider__dot-crop-red");
    }
}

function currentSlide(nb)
{
    var oldIndex = slideIndex;
    slideIndex = nb;
    
    var slide = get[slideIndex];
    var prevSlide = get[oldIndex];
    
    var dot = getDot[slideIndex];
    var oldDot = getDot[oldIndex];
    
    prevSlide.classList.remove("visible");       
    slide.classList.add("visible");  
    
    dot.classList.add("slider__dot-crop-red");
    oldDot.classList.remove("slider__dot-crop-red");
    
}

function nextFlag()
{
    var oldFlag = slideFlag;
    var newFlag = slideFlag + 3;

    if(slideFlag < getFlag.length / 3)
    {
        getFlag[oldFlag].classList.remove("active");       
        getFlag[newFlag].classList.add("active");
        slideFlag++;    
    }
}

function prevFlag()
{    
    var oldFlag = slideFlag + 2;
    var newFlag = slideFlag - 1;
    
    if(slideFlag > 0)
    {
        getFlag[oldFlag].classList.remove("active");       
        getFlag[newFlag].classList.add("active");
        slideFlag--;
    }
    
}

function auto()
{
    if(width < 650)
    {
       getFlag[slideFlag + 2].classList.remove("active")
       getFlag[slideFlag].classList.remove("active")
    }
}

auto();
