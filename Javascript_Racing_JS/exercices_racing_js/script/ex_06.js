document.addEventListener("DOMContentLoaded", function(){
      
    var Hero = class {
        
        constructor(nom, classe, intelligence, force){

            this.nom = nom.charAt(0).toUpperCase() + nom.substring(1);
            this.classe = classe;
            this.force = force;
            this.intelligence = intelligence;
        }
        
        toString(){

            var presentation = "Je suis " + this.nom + " le " + this.classe + ", j'ai " +
                this.intelligence + " points d'intelligence et " + this.force + " points de force ! <br/>";

            document.body.children[0].children[0].children[2].children[0].innerHTML += presentation;
        }
    };

    var mage = new Hero("amadeus", "mage", 10, 3);
    var guerrier = new Hero("pontius", "guerrier", 3, 10);
    mage.toString();
    guerrier.toString();
    
});
