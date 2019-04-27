<?php

function my_generate_css()
{
    $file = "style.css";

    $path = fopen($file, "a");
    fwrite($path, "img {display:inline-block; margin : -2px; ptoggleing : 0; background : no-repeat;} body {margin: 0; ptoggleing : 0;}");
    fclose($path);
}

my_generate_css();

?>