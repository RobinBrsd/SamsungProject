document.addEventListener("DOMContentLoaded", function(){
    
    const calulatrice = document.body.children[0].children[0].children[2].children[0];
    const resultatBox = calulatrice.children[0];
    const zero = calulatrice.children[1].children[16];
    const one = calulatrice.children[1].children[12];
    const two = calulatrice.children[1].children[13];
    const three = calulatrice.children[1].children[14];
    const four = calulatrice.children[1].children[8];
    const five = calulatrice.children[1].children[9];
    const six = calulatrice.children[1].children[10];
    const seven = calulatrice.children[1].children[4];
    const eight = calulatrice.children[1].children[5];
    const nine = calulatrice.children[1].children[6];
    
    const modulo = calulatrice.children[1].children[2];
    const divide = calulatrice.children[1].children[3];
    const multiply = calulatrice.children[1].children[7];
    const less = calulatrice.children[1].children[11];
    const add = calulatrice.children[1].children[15];
    const point = calulatrice.children[1].children[17];
    const arrow = calulatrice.children[1].children[0];
    const clear = calulatrice.children[1].children[1];
    const equal = calulatrice.children[1].children[18];
    
    zero.addEventListener("click", nbrPush);
    one.addEventListener("click", nbrPush);
    two.addEventListener("click", nbrPush);
    three.addEventListener("click", nbrPush);
    four.addEventListener("click", nbrPush);
    five.addEventListener("click", nbrPush);
    six.addEventListener("click", nbrPush);
    seven.addEventListener("click", nbrPush);
    eight.addEventListener("click", nbrPush);
    nine.addEventListener("click", nbrPush);
    
    modulo.addEventListener("click", nbrPush);
    modulo.addEventListener("click", operatorPush);
    divide.addEventListener("click", nbrPush);
    divide.addEventListener("click", operatorPush);
    multiply.addEventListener("click", nbrPush);
    multiply.addEventListener("click", operatorPush);
    less.addEventListener("click", nbrPush);
    less.addEventListener("click", operatorPush);
    add.addEventListener("click", nbrPush);
    add.addEventListener("click", operatorPush);
    point.addEventListener("click", nbrPush);
    
    arrow.addEventListener("click", back);
    clear.addEventListener("click", clean);
    equal.addEventListener("click", execute);
    
    var calcStr = "";
    var operator = [];
    var res = 0;
    var a = 0;
    var b = 0;
    
    var Calculette = class {
        
        constructor(nbr1, nbr2){

            this.nbrA = parseFloat(nbr1);
            this.nbrB = parseFloat(nbr2);
        }
        
        addition(){
            
            calcStr = "";
            operator = [];
            res = this.nbrA + this.nbrB;
            return res;
        }
        
        soustraction(){
            
            calcStr = "";
            operator = [];
            res = this.nbrA - this.nbrB;
            return res;
        }
        
        division(){
            
            calcStr = "";
            operator = [];
            res = this.nbrA / this.nbrB;
            return res;
        }
        
        multiplication(){
            
            calcStr = "";
            operator = [];
            res = this.nbrA * this.nbrB;
            return res;
        }
        
        modulo(){
            
            calcStr = "";
            operator = [];
            res = this.nbrA % this.nbrB;
            return res;
        }
    };
    
    
    function nbrPush(key)
    {
        var keyVal = this.innerHTML;
        calcStr += keyVal;
        resultatBox.innerHTML += keyVal;
    }
    
    function back() 
    {
        var last = resultatBox.innerHTML.substr(-1);
        var replace = resultatBox.innerHTML.replace(last, "");
        resultatBox.innerHTML = replace;
    }
    
    function clean()
    {
        resultatBox.innerHTML = "";
        calcStr = "";
        res = "";
        operator = [];
    }
    
    function operatorPush(op)
    {
        var y = this.innerHTML;
        operator.push(y);
    }
    
    function execute()
    {
        var ope = operator[0];
        
        var nb = calcStr.split("+");
        var a = nb[0];
        var b = nb[1];
        
        if(b === undefined || b === "" || b === null){
            
            var nb = calcStr.split("-");
            var a = nb[0];
            var b = nb[1];
        }
        
        if(b === undefined || b === "" || b === null){
            
            var nb = calcStr.split("/");
            var a = nb[0];
            var b = nb[1];
        }
        
        if(b === undefined || b === "" || b === null){
            
            var nb = calcStr.split("x");
            var a = nb[0];
            var b = nb[1];
        }
        
        if(b === undefined || b === "" || b === null){
            
            var nb = calcStr.split("%");
            var a = nb[0];
            var b = nb[1];
        }
        
        if(res != 0)
        {
            var newRes = new Calculette(res, b);
        }
        else {
            
            var newRes = new Calculette(a, b);
        }
        
        switch(ope) {
            case "%":
                resultatBox.innerHTML = newRes.modulo();
                break;
            case "/":
                resultatBox.innerHTML = newRes.division();
                break;
            case "-":
                resultatBox.innerHTML = newRes.soustraction();
                break;
            case "+":   
                resultatBox.innerHTML = newRes.addition();
                break;
            case "x":
                resultatBox.innerHTML = newRes.multiplication();
                break;
      } 
    }
    
});