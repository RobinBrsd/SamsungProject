$(document).ready(function () {
    
    $('#pp-nav').click(function() { 
        $(".param").toggleClass('param-show');
    });

    var txt_color = $('*').filter(function(){
        var color = $(this).css("color");
        return color === "#87C1EA" || color === "rgb(135, 193, 234)";
    });

    var border_color = $('*').filter(function(){
        var color = $(this).css("border-bottom-color");
        return color === "#87C1EA" || color === "rgb(135, 193, 234)";
    });

    var bg_color = $('*').filter(function(){
        var color = $(this).css("background-color");
        return color === "#87C1EA" || color === "rgb(135, 193, 234)";
    });

    var i = 0;

    $("#themes").click(function() {

        if(i == 0){
            $.each(border_color, function(){
                $(this).css("border-color", "#8df972");
            });

            $.each(txt_color, function(){
                $(this).css("color", "#8df972");
            });

            $.each(bg_color, function(){
                $(this).css("background-color", "#8df972");
            });
        }

        if(i == 1){
            $.each(border_color, function(){
                $(this).css("border-color", "#e85855");
            });

            $.each(txt_color, function(){
                $(this).css("color", "#e85855");
            });

            $.each(bg_color, function(){
                $(this).css("background-color", "#e85855");
            });
        }

        if(i == 2){
            $.each(border_color, function(){
                $(this).css("border-color", "#87C1EA");
            });

            $.each(txt_color, function(){
                $(this).css("color", "#87C1EA");
            });

            $.each(bg_color, function(){
                $(this).css("background-color", "#87C1EA");
            });
        }

        if(i < 2)
            i++;
        else
            i = 0;
    });
});