document.addEventListener("DOMContentLoaded", function(){
    
    const footer = document.body.children[0].children[0].children[2];
   
    var pangolin = new CustomEvent(
      "pangolin",
      {
         detail: {
             message : "testmsg",
        },
          
        bubbles: true,
        cancelable: true
      }
    );
    
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function setBg(a){
        this.style.backgroundColor = getRandomColor();
    }
    
    footer.children[0].addEventListener("pangolin", function(event) {
      
        this.style.backgroundColor = getRandomColor(); 
    
    });

   document.addEventListener("keypress", function() {
         
       footer.children[0].dispatchEvent(pangolin);
  
   });
});