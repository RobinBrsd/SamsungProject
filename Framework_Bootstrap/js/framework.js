$(document).ready(function(){

    // Disable btn //
    var btnDisable = $(".disabled");
    var sizeDisable = btnDisable.length;
    
    for(i = 0; i < sizeDisable; i++)
    {
        btnDisable[i].setAttribute('disabled', 'disabled');
    }

    // Modals PART // 
    var btn = $(".modals-btn");

    btn.click(function() {
        $( ".modals" ).toggleClass('show');
    });

    // INFOS BULLES PART // 
    var element = $(".tooltip");
    var size = element.length;

    for(i = 0; i < size; i++)
    {
        var curr = element[i];
        var title = curr.getAttribute('title');
        var attribute = curr.getAttribute('data-placement');

        set(title, attribute);
    }

    function set(title, attribute)
    {
        if(title != "")
        {
            if(attribute == "top"){
                var tooltip = $( "<div class='tool-top'>" + title + "</div>" );
                $(curr).append(tooltip);

                $(document).on( "mousemove", function( event ) {
                    var tooltipX = event.pageX;
                    var tooltipY = event.pageY - 60;
                    tooltip.css({top: tooltipY, left: tooltipX});
                });
            }

            if(attribute == "right"){
                var tooltip = $( "<div class='tool-right'>" + title + "</div>" );
                $(curr).append(tooltip);

                $(document).on( "mousemove", function( event ) {
                    var tooltipX = event.pageX + 30;
                    var tooltipY = event.pageY;
                    tooltip.css({top: tooltipY, left: tooltipX});
                });
            }

            if(attribute == "bottom"){
                var tooltip = $( "<div class='tool-bottom'>" + title + "</div>" );
                $(curr).append(tooltip);

                $(document).on( "mousemove", function( event ) {
                    var tooltipX = event.pageX;
                    var tooltipY = event.pageY + 30;
                    tooltip.css({top: tooltipY, left: tooltipX});
                });
            }

            if(attribute == "left"){
                var tooltip = $( "<div class='tool-left'>" + title + "</div>" );
                $(curr).append(tooltip);

                $(document).on( "mousemove", function( event ) {
                    var tooltipX = event.pageX - 60;
                    var tooltipY = event.pageY;
                    tooltip.css({top: tooltipY, left: tooltipX});
                });
            }       
            
            $(curr).hover(function() {
                $(tooltip).toggleClass("tool-show");
            });
        }
    }

});