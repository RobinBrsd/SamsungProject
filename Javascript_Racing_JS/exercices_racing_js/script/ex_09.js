document.addEventListener("DOMContentLoaded", function(){
    
    var footer = document.body.children[0].children[0].children[2];
    var draggable = footer.children[0].children[0];
    var whiteBoard = footer.children[1];
    
    draggable.draggable="true";
    
    function drag(event) {
        
        var style = window.getComputedStyle(event.target);
        draggable.style.position = "absolute";
        event.dataTransfer.setData("text",(parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY));
    }
    
    function drop(event) {
        
        var offset = event.dataTransfer.getData("text").split(',');
        var y = event.clientY + parseInt(offset[1]);
        var x = event.clientX + parseInt(offset[0]);
        
        if(y >= 175 && y <= 220 && x >= 24 && x <= 705)
        {
            draggable.style.top = y + 'px';
            draggable.style.left = x + 'px';
            whiteBoard.innerHTML = "Nouvelles coordonnées => {x:" + draggable.style.left + ", y:" + draggable.style.top + "}";  
        }
        
        event.preventDefault();
    }
    
    function over(event) {
        
        event.preventDefault();
    } 
    
    draggable.addEventListener('dragstart',drag);
    document.body.addEventListener('dragover',over);
    document.body.addEventListener('drop',drop); 

});
