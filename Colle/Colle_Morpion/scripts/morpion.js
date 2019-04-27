jQuery.fn.morpion = function(){

    class Morpion {

        constructor(){
            this.case = $(".cell");
            this.row = $(".row");
            this.player1 = "Player 1";
            this.player2 = "Player 2";
            this.replayBtn = $("#replay");
            
            this.playerTurn = "Player 2";

            this.setGrid(this.case);
            this.play(this.case);
            this.checkWin(this.row);
            this.replay(this.replayBtn, this.case);

            this.makeTab(this.row, this.case);
        }

        setGrid($case){
            for(var i = 0; i < $case.length; i++){
                $($case[i]).addClass("empty");
            }
        }

        getPlayerTurn(){
            if(this.playerTurn === this.player1){
                this.playerTurn = this.player2;
            }
            else {
                this.playerTurn = this.player1;
            }
            return this.playerTurn;
        }

        play($case){
            var that = this;
            function check($caseX){
                if($($caseX).hasClass('empty')){
                    var $turn = that.getPlayerTurn();
                    if($turn === "Player 1"){
                        $($caseX).html("X");
                        $($caseX).removeClass('empty');
                        $($caseX).addClass($turn);
                    }
                    if($turn === "Player 2"){
                        $($caseX).html("O");
                        $($caseX).removeClass('empty');
                        $($caseX).addClass($turn);
                    }
                }
                else{
                    console.log("Case Taken, play again");
                }
            }
            $case.click(function(){
                check(this);
            });
        }

        makeTab($row, $case){

            var tab = [];
            for (var i = 0; i < $row.length; i++)
            {
                for(var y = 0; y < $case.length;y++){
                    tab[y] = new Array($row[y]);
                    tab[i] = new Array($case[i]);
                }
            }
            console.log(tab);
        }

        checkWin($row){
            $("#grid").hover(function(){
                for(var i =  0; i < $row.length; i++){
                    var $case = $($row[i]).children();
                    for(var y = 0; y < $case.length; y++){
                        if($($case[y]).hasClass('Player 1')){
                            if($($case[y + 1]).hasClass('Player 1')){
                                if($($case[y + 2]).hasClass('Player 1')){
                                    addPoint("Player 1");
                                }
                            }
                        }
                        if($($case[y]).hasClass('Player 2')){
                            if($($case[y + 1]).hasClass('Player 2')){
                                if($($case[y + 2]).hasClass('Player 2')){
                                    addPoint("Player 2");
                                }
                            }
                        }
                    }
                }
            });

            function addPoint($player){
                var $p1 = $("#playerOne");
                var $p2 = $("#playerTwo");

                if($player === "Player 1"){
                    var $score = $p1.html();
                    $score++;
                    $p1.html($score);
                    $("#currentPlayer").html("Joueur 1 Win");
                }
                if($player === "Player 2"){
                    $score = $p2.html();
                    $p2.html($score + 1);
                    $("#currentPlayer").html("Joueur 2 Win");
                }
            }
        }

        replay($btn, $case){
            function clearGrid(){
                for(var i = 0; i < $case.length; i++){
                    $($case[i]).removeClass("Player 1");
                    $($case[i]).removeClass("Player 2");
                    $($case[i]).addClass("empty");
                    $($case[i]).html("");
                    $("#currentPlayer").html("Joueur ???");
                }
            }

            $btn.click(function(){
                clearGrid();
            });
        }
    }

    const Game = new Morpion();
}