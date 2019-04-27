document.addEventListener("DOMContentLoaded", function(){
    
    const footer = document.body.children[0].children[0].children[2];
   
    var img = document.createElement("img");
    img.src = 'apple.png';
    
    function convertImageToBase64(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    
    }
    
    var img64 = convertImageToBase64(img);
    
    localStorage.setItem("img64", img64);
    var dataImage = localStorage.getItem('img64');
    
    img.src = dataImage;
    footer.children[0].appendChild(img);
    
});
    
    