document.addEventListener("DOMContentLoaded", function(){
    
    var i = 1;
    
    function countClick(){   
    
        document.body.children[0].children[0].children[2].children[0].innerHTML = i;
        i++;
    }
    document.body.children[0].children[0].children[2].children[0].addEventListener("click", countClick);
});