document.addEventListener("DOMContentLoaded", function(){
    
    var footer = document.body.children[0].children[0].children[2];
    var cnv = footer.children[0].children;        
    var size = cnv.length;
    var cnvTrie = [];
    
    // Orange Push
    for(var i = 0; i < size; i++) {
      
        var style = window.getComputedStyle(cnv[i]);
        var backgroundColor = style.backgroundColor;
        
        if(backgroundColor == "rgb(255, 165, 0)")
        {
            cnvTrie.push(backgroundColor);
        } 
    }
    
    // Purple Push
    for(var i = 0; i < size; i++) {
      
        var style = window.getComputedStyle(cnv[i]);
        var backgroundColor = style.backgroundColor;

        if(backgroundColor == "rgb(128, 0, 128)")
        {
            cnvTrie.push(backgroundColor);
        } 
    }
    
    // Black Push
    for(var i = 0; i < size; i++) {
      
        var style = window.getComputedStyle(cnv[i]);
        var backgroundColor = style.backgroundColor;
        
        if(backgroundColor == "rgb(0, 0, 0)")
        {
            cnvTrie.push(backgroundColor);
        } 
    }
    
    // Vert Push
    for(var i = 0; i < size; i++) {
      
        var style = window.getComputedStyle(cnv[i]);
        var backgroundColor = style.backgroundColor;
        
        if(backgroundColor == "rgb(128, 128, 0)")
        {
            cnvTrie.push(backgroundColor);
        } 
    }
    
    var x = 0;
    cnvTrie.forEach(function(color) {
            
              cnv[x].style.backgroundColor = color;
              x++;
        
        });
    
});