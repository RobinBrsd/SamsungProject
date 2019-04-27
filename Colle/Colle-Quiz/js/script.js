const submit = $('#submit');

var score = 0;

function getReponse()
{
    score = 0;
    
    var r0 = $('input[name=r0]:checked', '#big-form').val();
    var r1 = $('input[name=r1]:checked', '#big-form').val();
    var r2 = $('input[name=r2]:checked', '#big-form').val();
    var r3 = $('input[name=r3]:checked', '#big-form').val();
    var r4 = $('input[name=r4]:checked', '#big-form').val();
    var r5 = $('input[name=r5]:checked', '#big-form').val();
    var r6 = $('input[name=r6]:checked', '#big-form').val();
    var r7 = $('input[name=r7]:checked', '#big-form').val();
    var r8 = $('input[name=r8]:checked', '#big-form').val();
    
    // reponse 1
    if(r0 == "2")
    {
        $("#a").html("");    
        score++;
    } 
    else 
        $("#a").html("Wrong");
    
    // reponse 2
    if(r1 == "1")
    {
        $("#b").html("");    
        score++;
    } 
    else 
        $("#b").html("Wrong");
    
    // reponse 3
    if(r2 == "1")
    {
        $("#c").html("");    
        score++;
    } 
    else 
        $("#c").html("Wrong");
    
    // reponse 4
    if(r3 == "3")
    {
        $("#d").html("");    
        score++;
    } 
    else 
        $("#d").html("Wrong");
    
    // reponse 5
    if(r4 == "1")
    {
        $("#e").html("");    
        score++;
    } 
    else 
        $("#e").html("Wrong");
    
    // reponse 6
    if(r5 == "2")
    {
        $("#f").html("");    
        score++;
    } 
    else 
        $("#f").html("Wrong");
    
    // reponse 7
    if(r6 == "2")
    {
        $("#g").html("");    
        score++;
    } 
    else 
        $("#g").html("Wrong");
    
    // reponse 8
    if(r7 == "4")
    {
        $("#h").html("");    
        score++;
    } 
    else 
        $("#h").html("Wrong");
    
    // reponse 9
    if(r8 == "4")
    {
        $("#i").html("");    
        score++;
    } 
    else 
        $("#i").html("Wrong");
        
    
    $("#resultat").html("Votre score est de " + score + " bonnes reponse"); 
}
    
submit.click(getReponse);