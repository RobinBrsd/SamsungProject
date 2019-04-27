<?php

function my_increment($int)
{
    if($int >= 0 && $int <= 10)
    {
        echo $int;
        my_increment($int + 1);
    }
}

my_increment(3);

?>