document.addEventListener("DOMContentLoaded", function(){
   
    
    function popUp()
    {   
        var name = prompt("Quel est votre nom ?");
        
        if(name == null || name == ""){
            popUp();
        }
        else {
            if(confirm("Etes vous sûr que " + name + " est votre nom ?")){
                alert("Bonjour " + name + " !");
                document.body.children[0].children[0].children[2].children[0].innerHTML = "Bonjour " + name + " !";
            }
            
        }
        
        
    }
    document.body.children[0].children[0].children[2].children[0].addEventListener("click", popUp);
    

});