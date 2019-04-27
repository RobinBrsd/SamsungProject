const ul = $(".resultat");
const li = $(".pag");

var count = li.length;
var x = 1;

// Genere la liste de pages
var pag_ul = document.createElement("ul");
pag_ul.id = "pagination";

ul[0].appendChild(pag_ul);
    
for(var i = 0; i < count; i = i + 10)
{
    var pag_li = document.createElement("li");
    pag_li.innerHTML = x;
    pag_li.id = x;
    pag_li.classList.add("list");
    pag_li.onclick = set;
    pag_ul.appendChild(pag_li);
    x++;
}

for(var i = 10; i < count; i++)
{
    li[i].classList.add("li_hidden");
}

var listLi = $(".list");
var countList = listLi.length;

for(var i = 5; i < countList; i++)
{
    listLi[i].classList.add("listLi_hidden");
}

function set(y)
{
    var atm = this.id;
    
    show(atm);
    page(atm);
}

function show(id)
{
    var pageStart = id * 10 - 10;
    var pageEnd = id * 10;
    
    // Current id
    for(i = pageStart; i < pageEnd; i++)
    {
        li[i].classList.remove("li_hidden");    
    }
    
    // Before selected id
    for(i = 0; i < pageStart; i++)
    {
        li[i].classList.add("li_hidden");    
    }
    
    // After selected id
    for(i = pageEnd; i < count; i++)
    {
        li[i].classList.add("li_hidden");  
    }
}

function page(atm)
{
    var current = listLi[atm - 1];
    current.classList.add("actif");
    
    if(atm - 1 >  5)
    {
        var start = atm - 5;
    }
    else
        var start = atm - 1;
    
    var end = atm - 1 + 5;
    // Current id
    for(i = start; i < end; i++)
    {
        listLi[i].classList.remove("listLi_hidden");
        listLi[i].classList.remove("actif");
        
    }
    
    current.classList.add("actif");
    
    // Before id
    for(i = 0; i < start; i++)
    {
        listLi[i].classList.add("listLi_hidden");
        listLi[i].classList.remove("actif");
    }
    
    // After id
    for(i = end; i < countList; i++)
    {
        listLi[i].classList.add("listLi_hidden"); 
        listLi[i].classList.remove("actif");
    }
}