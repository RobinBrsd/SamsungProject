<?php

function my_merge_image($path1 = NULL, $path2 = NULL)
{
    if($path1 == NULL || $path2 == NULL)
    {
        echo "Please insert picture path";
        return;
    }
    elseif(!file_exists($path1) || !file_exists($path2))
    {
        echo "Picture path incorrect";
        return;
    }
    else
    {
        $img = new Imagick();

        $img->setBackgroundColor("transparent");
        $img->readImage($path1);
        $img->readImage($path2);
        $img->resetIterator();

        $res = $img->appendImages(false);
        $res->setImageformat("png");
        $res->writeImage('final.png');
    }
}
my_merge_image("img/1.png", "img/3.jpeg");

?>