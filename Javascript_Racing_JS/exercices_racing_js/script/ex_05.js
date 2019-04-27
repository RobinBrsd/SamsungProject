document.addEventListener("DOMContentLoaded", function(){
    
    var btnA = document.body.children[0].children[0].children[2].children[0].children[0];
    var btnB = document.body.children[0].children[0].children[2].children[0].children[1];
    var select = document.body.children[0].children[0].children[2].children[0].children[2];
    
    var size = "16";
    
    function upgrade(){
        
        size++;  
        document.body.style.fontSize = size + "px";  
    }
    
    function downgrade(){
        
        size--;
        document.body.style.fontSize = size + "px";
        
    }
    
    function setBg(){
        
        var option = select.selectedIndex;
        
        if(option == 1){
            
            document.body.style.backgroundColor = '#bdc3c7';
        }
        
        if(option == 2){
            
            document.body.style.backgroundColor = '#1abc9c';
        }
        if(option == 3){
            
            document.body.style.backgroundColor = '#f1c40f';
        }
        if(option == 4){
            
            document.body.style.backgroundColor = '#d35400';
        }
        if(option == 5){
            
            document.body.style.backgroundColor = '#e74c3c';
        }
        if(option == 6){
            
            document.body.style.backgroundColor = '#40d47e';
        }
        if(option == 7){
            
            document.body.style.backgroundColor = '#3498db';
        }
        
    }
    
    btnA.addEventListener("click", upgrade);
    btnB.addEventListener("click", downgrade);
    select.addEventListener("click", setBg);
});