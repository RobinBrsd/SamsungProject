var param = angular.module('param',[]);

param.controller('ctrl', function($scope){
     
    $scope.col = 6;
    $scope.row = 5;
    $scope.colorP1 = "Red";
    $scope.colorP2 = "Yellow";
    $scope.colorBG = "#9ec3ff";
    $scope.colorGrid = "#1461e0";

    $scope.updateBoard = function(){
        $("#set").css("display", "none");
        $("#board").p4($scope.col, $scope.row, $scope.colorP1, $scope.colorP2, $scope.colorBG, $scope.colorGrid);
    }

    $scope.close = function() {
        $(".parametre").addClass("hide");
        $(".wheel").removeClass("hideR");     
        $scope.updateBoard();
    }

    $scope.open = function() {
        $(".parametre").removeClass("hide");
        $(".wheel").addClass("hideR");  
    }

    // $scope.validColor = function(){
    //     var $div = $("<div>");
    //     $div.css("border", "1px solid " + $scope.colorP1);
    //     return ($div.css("border-color")!="")
    // }
});