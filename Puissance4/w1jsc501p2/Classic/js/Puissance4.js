jQuery.fn.p4 = function($col, $row, $colorP1, $colorP2){

    class Puissance4 {

        constructor($paramA, $paramB, $paramC, $paramD) {
            
            // SET VALUES
            if($.isNumeric($paramA) && $paramA <= 99 && $paramA >= 4)
                this.col = $paramA;
            else
                this.col = 6;

            if($.isNumeric($paramB) && $paramB <= 99 && $paramB >= 4)
                this.row = $paramB;
            else
                this.row = 5;

            if($paramC != undefined)    
                this.colorP1 = $paramC;
            else
                this.colorP1 = "Red";

            if($paramD != undefined)
                this.colorP2 = $paramD;
            else
                this.colorP2 = "Yellow";
            
            this.audioWin = new Audio('victory.mp3');
            this.audio3 = new Audio('3.mp3');
            this.audioDown = new Audio('down.mp3');



            if(this.colorP1 != this.colorP2){
                this.playerTurn = this.colorP1;
                this.generateGrid(this.col, this.row, this.colorP1, this.colorP2);
                this.watchGrid();
            }
            else
                $("body").append("<h1> Color are the same ! </h1>");
            
        }

        generateGrid($col, $row, $colorP1, $colorP2){
            const game = $("<div>").attr('id', 'game');
            const player1_area = $("<div>").attr('id', 'area1');
            const player2_area = $("<div>").attr('id', 'area2');
            player1_area.css("background-color", $colorP1);
            player2_area.css("background-color", $colorP2);
            
            if($("#area1").val() == undefined){
                $("#board").append(player1_area);
                $("#area1").append("<p>" + this.colorP1 + " Player Score :" + "<span id='score1'> 0 </span>" + "</p>")
            }
            if($("#area2").val() == undefined){
                $("#board").append(player2_area);
                $("#area2").append("<p>" + "<span id='score2'> 0 </span>" +  ": Score Player " + this.colorP2 + "</p>")
            }

            $("#board").append(game);
            $("#game").append('<h1> Puissance 4 </h1>');

            for(let x = 0; x < $row; x++){
                const lng = $("<div>").addClass("lng");
                lng.attr("data-row", x);
                for(let y = 0; y < $col; y++){
                    const spot = $("<div>").addClass("spot empty");
                    spot.attr("data-spot", y);
                    spot.attr("data-row", x);
                    spot.append("<i class='fab fa-bitcoin'></i>");
                    spot.append("<i class='fab fa-bitcoin drop'></i>");
                    lng.append(spot);
                }
                $("#game").append(lng);
            }
        }

        watchGrid(){
                var that = this;
                var btnUndo1 = $("#undop1");
                var btnUndo2 = $("#undop2");

                var lastCasePlay;
                function check(col){    
                    $(col).mouseenter(function x(){
                        for(let i = col.length-1; i >= 0 ; i--){
                            var spot = col[i];
                            if($(spot).hasClass("empty")){
                                $(spot).css("color", that.getPlayerTurn());
                                $(spot).children("i:first").css("visibility", "visible");
                                
                                $(col).mouseleave(function(){
                                    $(spot).children("i:first").css("visibility", "hidden");
                                });

                                $(col).click(function(){
                                    if($(spot).hasClass("empty")){
                                        var pos = $(spot).position();
                                        $(spot).css("background-color", "rgb(235,235,235)");
                                        $(spot).addClass(that.getPlayerTurn() + "playerSpot");
                                        $(spot).css("color", that.getPlayerTurn());
                                        that.audioDown.playbackRate = 1;
                                        that.audioDown.play();
                                        $(spot).children("i:nth-child(2)").addClass("down");
                                        $(spot).children("i:nth-child(2)").css("top", pos.top + 7);
                                        $(spot).removeClass("empty");
                                        that.checkWin();

                                        var $posRow = $(spot).attr("data-row");
                                        var $posCol = $(spot).attr("data-spot");
                                        lastCasePlay = $('.spot[data-spot="' + $posCol + '"][data-row="'+ $posRow + '"]');

                                        if(that.playerTurn === that.colorP1){
                                            that.playerTurn = that.colorP2;
                                        }
                                        else {
                                            that.playerTurn = that.colorP1;
                                        }

                                        btnUndo1.click(function(){
                                            if($(lastCasePlay).hasClass(that.colorP1 + "playerSpot")){
                                                $(lastCasePlay).css("background-color", "rgba(255,255,255,0.63)");
                                                $(lastCasePlay).removeClass(that.colorP1 + "playerSpot");
                                                $(lastCasePlay).css("color", "#fff");
                                                $(lastCasePlay).children("i:nth-child(2)").removeClass("down");
                                                $(lastCasePlay).children("i:nth-child(2)").css("top", "0px");
                                                $(lastCasePlay).addClass("empty");
                                                that.playerTurn = that.colorP1;
                                                return false;
                                            }
                                        });

                                        btnUndo2.click(function(){
                                            if($(lastCasePlay).hasClass(that.colorP2 + "playerSpot")){
                                                $(lastCasePlay).css("background-color", "rgba(255,255,255,0.63)");
                                                $(lastCasePlay).removeClass(that.colorP2 + "playerSpot");
                                                $(lastCasePlay).css("color", "#fff");
                                                $(lastCasePlay).children("i:nth-child(2)").removeClass("down");
                                                $(lastCasePlay).children("i:nth-child(2)").css("top", "0px");
                                                $(lastCasePlay).addClass("empty");
                                                that.playerTurn = that.colorP2;
                                                return false;                                              
                                            }
                                        });
                                    }
                                });
                                return spot;
                            }
                        }
                    });
                }
                $("#game").mouseenter(function(){
                    for(let i = 0; i < $col; i++){
                        const $col = $(".lng").find("[data-spot='" + i + "']");
                        check($col);
                    }
                });
        }

        checkWin(){
            var $row =  $(".lng");
            var $case = $(".lng").find(".spot");
            var that =  this;

            $case.each(function(x, value){
                if($(value).hasClass(that.getPlayerTurn() + "playerSpot")){
                    var $posRow = $(value).attr("data-row");
                    var $posCol = $(value).attr("data-spot");
                    var sizeCol = $($row[0]).find(".spot").length;
                    
                    var $posColNext;
                    if($posCol == sizeCol - 1){
                        $posColNext = parseInt($posCol) - 1;
                    } else {
                        $posColNext = parseInt($posCol) + 1;
                    }

                    // Check By Each Diag
                    let nextRight = $('.spot[data-spot="' + (parseInt($posCol) + 1) + '"][data-row="'+ (parseInt($posRow) - 1) + '"]');
                    let nextLeft = $('.spot[data-spot="' + (parseInt($posCol) - 1) + '"][data-row="'+ (parseInt($posRow) - 1) + '"]');

                    // Check Right Diag
                    if(nextRight.hasClass(that.getPlayerTurn() + "playerSpot")){
                        let nextRight = $('.spot[data-spot="' + (parseInt($posCol) + 2) + '"][data-row="'+ (parseInt($posRow) - 2) + '"]');
                        if(nextRight.hasClass(that.getPlayerTurn() + "playerSpot")){
                            let nextRight = $('.spot[data-spot="' + (parseInt($posCol) + 3) + '"][data-row="'+ (parseInt($posRow) - 3) + '"]');
                            that.audio3.play();
                            if(nextRight.hasClass(that.getPlayerTurn() + "playerSpot")){
                                that.winner();
                                return false;
                            }
                        }
                    }

                    // Check Left Diag
                    if(nextLeft.hasClass(that.getPlayerTurn() + "playerSpot")){
                        let nextLeft = $('.spot[data-spot="' + (parseInt($posCol) - 2) + '"][data-row="'+ (parseInt($posRow) - 2) + '"]');
                        if(nextLeft.hasClass(that.getPlayerTurn() + "playerSpot")){
                            let nextLeft = $('.spot[data-spot="' + (parseInt($posCol) - 3) + '"][data-row="'+ (parseInt($posRow) - 3) + '"]');
                            that.audio3.play();
                            if(nextLeft.hasClass(that.getPlayerTurn() + "playerSpot")){
                                that.winner();
                                return false;
                            }
                        }
                    }

                    // Check By Each Row
                    $($row[$posRow]).each(function(_, value){
                        var next = $(value).find("[data-spot='" + $posColNext + "']");
                        if($(next).hasClass(that.getPlayerTurn() + "playerSpot")){
                            var next2 = $(value).find("[data-spot='" + ($posColNext + 1) + "']");
                            if($(next2).hasClass(that.getPlayerTurn() + "playerSpot")){
                                var next3 = $(value).find("[data-spot='" + ($posColNext + 2) + "']");
                                that.audio3.play();  
                                if(next3.hasClass(that.getPlayerTurn() + "playerSpot")){
                                    that.winner();
                                    return false;
                                }
                            }
                        }
                    });
                    // Check By Each Col
                    for(let i = 0; i < sizeCol; i++){
                        const $col = $(".lng").find("[data-spot='" + i + "']");
                        for(let i = 0; i < $col.length; i++){
                            if($($col[i]).hasClass(that.getPlayerTurn() + "playerSpot")){
                                var next = $($col[i - 1]);
                                if($(next).hasClass(that.getPlayerTurn() + "playerSpot")){
                                    var next = $($col[i - 2]);
                                    if($(next).hasClass(that.getPlayerTurn() + "playerSpot")){
                                        var next = $($col[i - 3]);
                                        that.audio3.play();
                                        if(next.hasClass(that.getPlayerTurn() + "playerSpot")){
                                            that.winner();
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        
        winner(){
            $(".modal").css("opacity", '1');
            $(".modal").css("z-index", '999');
            $("#winner").html(this.getPlayerTurn() + " Player Win !");
            this.audioWin.play();

            var that = this;
            $("#replay").click(function(){
                $(".modal").css("opacity", '0');
                $(".modal").css("z-index", '-5');
                $("#game").remove();

                that.generateGrid(that.col, that.row, that.colorP1, that.colorP2);
                that.watchGrid();

            });

            this.scoreUp(this.getPlayerTurn());
        }

        scoreUp($winner){
            var score1 = $("#score1").html();
            var score2 = $("#score2").html();
            if($winner == this.colorP1){
                score1++;
                $("#score1").html(" " + score1);
            }
            else{
                score2++;
                $("#score2").html(score2 + " ");
            }
        }

        getPlayerTurn(){
            return this.playerTurn;
        }
    }

    const Game = new Puissance4($col, $row, $colorP1, $colorP2);
}