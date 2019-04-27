document.addEventListener("DOMContentLoaded", function(){
    
    const footer = document.body.children[0].children[0].children[2];
    const inputs = footer.children[0].children[0];
    const resultBox = footer.children[1];
    
    var string = "";
    var balise = "";
    var baliseEnd = "";
    
    var a = document.createElement("a");

    function getInfos(){
        
        var str = inputs.value;
        var tmpstr = str.substring(str.indexOf("]") + 1);
        
        string = tmpstr.substring(0, tmpstr.indexOf("["))
        baliseEnd = tmpstr.substring(tmpstr.indexOf("["))
        balise = str.substring(0, str.indexOf("]") + 1);
    }
    
    function verifBalise(){
        
        getInfos();
        var BaliseOpt = balise.substring(balise.indexOf("<") + 1);
        BaliseOpt = BaliseOpt.substring(0, BaliseOpt.indexOf(">"));
        
        if(balise == "[B]")
        {
            resultBox.innerHTML = string;
            resultBox.style.fontWeight = "Bold";
        }
        else if(balise == "[U]")
        {
            resultBox.innerHTML = string;
            resultBox.style.textDecoration = "underline";
        }
        else if(balise == "[S]")
        {
            resultBox.innerHTML = string;
            resultBox.style.textDecoration = "line-through";
        }
        else if(baliseEnd == "[/COLOR]")
        {
            resultBox.innerHTML = string;
            resultBox.style.color = BaliseOpt;
        }
        else if(baliseEnd == "[/LINK]")
        {
            a.href = "https://" + BaliseOpt;
            a.innerHTML = string;
            resultBox.appendChild(a);
        }
    }
    
    inputs.addEventListener('keypress', verifBalise);
});