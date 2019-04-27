document.addEventListener("DOMContentLoaded", function(){
   
    var board = document.body.children[0].children[0].children[2].children[0];  
    var count = "";
    
    document.onkeypress = function(majKey) {
         
        var key = majKey.which || majKey.keyCode;
        var txt = String.fromCharCode(key); 
        
        if(count.length < 43){
            
            count += txt;
            board.innerHTML = count;
        }
        if(count.length == 43){
            
            var a = count.substring(0,1);
            var b = count.replace(a, "");
            count = b;
            board.innerHTML = count;
            majKey;
        }
    };
});