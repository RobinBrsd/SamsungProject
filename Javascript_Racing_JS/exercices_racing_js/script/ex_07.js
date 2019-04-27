document.addEventListener("DOMContentLoaded", function(){
    
    var cnv = document.body.children[0].children[0].children[2].children[0].children[0];
    var btnPause = document.body.children[0].children[0].children[2].children[1].children[0];
    var btnStop = document.body.children[0].children[0].children[2].children[1].children[1];
    var btnMute = document.body.children[0].children[0].children[2].children[1].children[2];
    var audio = new Audio ("Feu de bois.mp3");
    
    var context = cnv.getContext("2d");
    context.beginPath();
    context.lineTo(6, 6);
    context.lineTo(14, 10);
    context.lineTo(6, 14);
    context.closePath();
    
    context.strokeStyle = "rgb(255, 255, 255)";
    context.stroke();
    
    cnv.addEventListener("click", play);
    btnStop.addEventListener("click", stop);
    btnPause.addEventListener("click", pause);
    btnMute.addEventListener("click", mute);
    
    function play(){
        
        audio.play();
    }

    function stop(){
        
        audio.currentTime = 0;
        audio.pause();
        
    }
    
    function pause(){
        
        audio.pause();
    } 
    
    function mute(){
        
        audio.muted = true;
    }

});