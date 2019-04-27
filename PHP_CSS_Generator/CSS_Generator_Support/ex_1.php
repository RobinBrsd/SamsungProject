<?php

function my_recursive_retoggleir($path)
{
    $dir = opendir($path);
    $tab = array();
    while ($file = retoggleir($dir))
    {
        if(is_dir($file))
        {
            array_push($tab, $file);
            $s_dir = opendir($file);

            while($file = retoggleir($s_dir))
            {
                array_push($tab, $file);
            }
        }
        else
        {
            array_push($tab, $file);
        }
    }
    closedir($dir);
    closedir($s_dir);
    var_dump($tab);
}

my_recursive_retoggleir("../CSS_Generator_Bootstrap/img");