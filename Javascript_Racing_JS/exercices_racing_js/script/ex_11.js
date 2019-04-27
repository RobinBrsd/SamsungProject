document.addEventListener("DOMContentLoaded", function(){
    
    var footer = document.body.children[0].children[0].children[2];
    var whiteBoard = footer.children[0];
    var link = whiteBoard.children[0];

    function makeCookie(){
        
        var newDiv = document.createElement("div");
        var newBtn = document.createElement("button");
        
        var date = new Date();
        
        date.setDate(date.getDate()+1);
        
        document.cookie = "acceptsCookies=true; expires =" + date + "; path=/";
        
        if(document.cookie === "acceptsCookies=true")
        {    
            whiteBoard.innerHTML = "";
            newBtn.innerHTML = "Supprimer le cookie";
            footer.append(newDiv);
            newDiv.append(newBtn);

            var btnDestroy = footer.children[1].children[0];
            btnDestroy.addEventListener("click", destroyCookie); 
        }
    }
    
    function destroyCookie(){
        
        var newLink = document.createElement("a");
        
        document.cookie = "acceptsCookies=; expires = 20 Nov 2018 12:00:00 UTC; path=/";
        
        footer.removeChild(footer.children[1]); 
        whiteBoard.innerHTML = "Ce site utilise les cookies, cliquez sur OK si vous acceptez leur utilisation.";
        newLink.innerHTML = "OK";
        newLink.href = "#";
        newLink.style.padding = "3px";
        whiteBoard.append(newLink);
        
        newLink.addEventListener("click", makeCookie);  
    }
    
    link.addEventListener("click", makeCookie);    
    
});