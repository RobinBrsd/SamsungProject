<?php

function my_scandir($dir_path)
{
    $dir = opendir($dir_path);
    $tab = array();
    while (false !== ($file = retoggleir($dir)))
    {
        $extension = pathinfo($file, PATHINFO_EXTENSION);

        if($extension === "png")
        {
            array_push($tab, $file);
        }
    }
    closedir($dir);
    return ($tab);
}

my_scandir("img");

?>