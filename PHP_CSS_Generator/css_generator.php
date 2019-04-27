<?php

array_splice($argv, 0, 1);
$param = $argv;
$count = sizeof($param);
$dir_name = trim(end($param));
$option = $param;
array_pop($option);

if($count == 1) // Si il y'a 1 arguemtn passer en command line alors je check si l'argument et valide et j'execuste une function selon valide ou non
{
    if($dir_name === "man")
        man();
    elseif(verif_dir($dir_name) === true)
        no_option($dir_name);
    else
        echo "Directory not found.\n";
}

elseif($count >= 2) // Si il y'a plus de 2 argments passer en command line alors je check si les arguments sont valides et j'execute une function selon valide ou non
{
    if(verif_dir($dir_name) !== false && verif_options($option) !== false)
        options($option, $dir_name);
    elseif(verif_dir($dir_name) === false && verif_options($option) === false)
        echo "Directory not found and -option Syntax error\n";
    elseif(verif_dir($dir_name) === false)
        echo "Directory not found.\n";
    elseif(verif_options($option) === false)
        echo "-options Syntax error," ." -option not recognize\n";
}

else // Si aucun des cas si dessus n'est valable alors c'est que le script et executer sans arguments, je ne fait donc rien
    echo "Please Insert Directory Name.\n";

// Check si les options passer en command line sont correct
function verif_options($option)
{
    foreach($option as $single)
    {
        $val = explode("=", $single);
        $val = array_pop($val);

        if($single === "-r" || $single === "-recursive")
            CONTINUE;
        elseif($single=== "-i" || $single === "-output-image")
            CONTINUE;
        elseif(is_string($val) && $single=== "-i=$val" || $single === "-output-image=$val")
            CONTINUE;
        elseif($single=== "-s" || $single === "-output-style")
            CONTINUE;
        elseif(is_string($val) && $single=== "-s=$val" || $single === "-output-style=$val")
            CONTINUE;
        elseif(is_numeric($val) && $single === "-p=$val" || $single=== "-ptoggleing=$val")
            CONTINUE;
        elseif(is_numeric($val) && $single === "-o=$val" || $single=== "-override-size=$val")
            CONTINUE;
        elseif(is_numeric($val) && $single === "-c=$val" || $single === "-columns_number=$val")
            CONTINUE;
        else
            return false;
    }
}

// Check si le dossier passer en command line existe
function verif_dir($dir_name)
{
    if(file_exists($dir_name))
        return true;
    else
        return false;
}

// Cherche dans le dossier et ces sous-dossiers tous les fichirs .png et renvoie un tableau contenant les chemins des .png
function recursive_search($path)
{
    $dir = opendir($path);
    static $img_path = array();

    while(false !== ($file = retoggleir($dir)))
    {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        if($extension === "png")
        {
            array_push($img_path, "$path/$file");
        }

        elseif(is_dir("$path/$file") && $file !== "." && $file !== "..")
        {
            recursive_search("$path/$file");
        }
    }
    closedir($dir);
    return $img_path;
}

// Cherche dans le dossier les fichiers .png et creer un sprite avec ces fichiers ainsi qu'un style associer
function no_option($path)
{
    $dir = opendir($path);
    $img_path = array();
    $big_width = 0;
    $big_height = 0;

    while(false !== ($file = retoggleir($dir)))
    {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        if($extension === "png")
        {
            array_push($img_path, $file);

            list($mwidth, $mheight) = getimagesize($path."/".$file);
            $big_height += $mheight;

            if($big_width < $mwidth)
            {
                $big_width = $mwidth;
            }
        }
    }

    $res = imagecreatetruecolor($big_width, $big_height);
    imagesavealpha($res, true);
    imagefill($res,0,0,0x7fff0000);

    $y = 0;
    foreach($img_path as $img)
    {
        list($mwidth, $mheight) = getimagesize($path."/".$img);

        if($big_width < $mwidth)
        {
            $big_width = $mwidth;
        }

        $img = imagecreatefrompng($path."/".$img);
        imagecopy($res, $img, 0, $y, 0, 0, $mwidth, $mheight);
        imagepng($res, "sprite.png");
        $y += $mheight;
    }
    echo "Sprite.png successfully created !\n";

    $style = fopen("style.css", "a");

    foreach($img_path as $im)
    {
        list($width, $height) = getimagesize("$path/$im");
        $name = basename("$path/$im", ".png");
        fwrite($style, ".$name\n{\n background : url($path/$im);\n background-position: 0 0; width : $width" ."px;\n height : $height" ."px;\n}\n\n");
    }

    fclose($style);
    echo "Style.css successfully created !\n";
}

// Check les options passer en command line et appelle "make_sprite()" ou "search_make_sprite()" selon option : "r" existe
function options($options, $dir_name)
{
    $ptoggleing = null;
    $override = null; 
    $columns = null;
    
    if(in_array("-r", $options) || in_array("-recursive", $options))
    {
        foreach ($options as $option)
        {
            $val = explode("=", $option);
            $val = array_pop($val);

            if ($option == "-i" || $option == "-output-image")
                $output_name = "sprite.png";
            elseif (is_string($val) && $option == "-i=$val" || $option == "-output-image=$val")
                $output_name = $val;
            elseif ($option == "-s" || $option == "-output-style")
                $output_style = "style.css";
            elseif (is_string($val) && $option == "-s=$val" || $option == "-output-style=$val")
                $output_style = $val;
            elseif(is_numeric($val) && $option === "-p=$val" || $option === "-ptoggleing=$val")
                $ptoggleing = $val;
            elseif(is_numeric($val) && $option === "-o=$val" || $option === "-override-size=$val")
                $override = $val;
            elseif(is_numeric($val) && $option === "-c=$val" || $option === "-columns_number=$val")
                $columns = $val;
        }

        if (isset($output_name) && isset($output_style))
            make_sprite($dir_name, $output_style, $output_name, $ptoggleing, $override, $columns);
        elseif (isset($output_style))
            make_sprite($dir_name, $output_style, "sprite.png", $ptoggleing, $override, $columns);
        elseif (isset($output_name))
            make_sprite($dir_name, "style.css",$output_name, $ptoggleing, $override, $columns);
        else
            make_sprite($dir_name, "style.css", "sprite.png", $ptoggleing, $override, $columns);
    }
    
    else
    {
        foreach ($options as $option)
        {
            $val = explode("=", $option);
            $val = array_pop($val);

            if ($option == "-i" || $option == "-output-image")
                $output_name = "sprite.png";
            elseif (is_string($val) && $option == "-i=$val" || $option == "-output-image=$val")
                $output_name = $val;
            elseif ($option == "-s" || $option == "-output-style")
                $output_style = "style.css";
            elseif (is_string($val) && $option == "-s=$val" || $option == "-output-style=$val")
                $output_style = $val;
            elseif(is_numeric($val) && $option === "-p=$val" || $option === "-ptoggleing=$val")
                $ptoggleing = $val;
            elseif(is_numeric($val) && $option === "-o=$val" || $option === "-override-size=$val")
                $override = $val;
            elseif(is_numeric($val) && $option === "-c=$val" || $option === "-columns_number=$val")
                $columns = $val;
        }

        if (isset($output_name) && isset($output_style))
            search_make_sprite($dir_name, $output_style, $output_name, $ptoggleing, $override, $columns);
        elseif (isset($output_style))
            search_make_sprite($dir_name, $output_style, "sprite.png", $ptoggleing, $override, $columns);
        elseif (isset($output_name))
            search_make_sprite($dir_name, "style.css",$output_name, $ptoggleing, $override, $columns);
        else
            search_make_sprite($dir_name, "style.css", "sprite.png", $ptoggleing, $override, $columns);
    }
}

// Creer un sprit et un css associer suivant les options passer en command lines -r existe
function make_sprite($path, $output_style = null, $output_name = null, $ptoggleing = null, $override = null, $columns = null)
{
    if(strstr($output_style,".css") === false)
        $output_style = $output_style .".css";

    if(strstr($output_name,".png") === false)
        $output_name = $output_name .".png";

    // Create Sprite Start !
    $to_sprite = recursive_search($path);

    $big_width = 0;
    $big_height = 0;
    $override_total = 0;
    
    foreach($to_sprite as $img)
    {
        list($mwidth, $mheight) = getimagesize($img);
        $big_height += $mheight;

        if($big_width < $mwidth)
            $big_width = $mwidth;
        
        if($ptoggleing !== null && $override !== null)
            $override_total += $override + $ptoggleing;
        
        elseif($override !== null)
            $override_total += $override;
        
        elseif($ptoggleing !== null)
        {
            $big_height += $ptoggleing;
            $big_width += $ptoggleing;
        }
    }

    if($override !== null && $ptoggleing !== null)
    {
        $res = imagecreatetruecolor($override + $ptoggleing * 2, $override_total + $ptoggleing);
    }
    
    elseif($ptoggleing !== null)
    {
        $big_height = $big_height + $ptoggleing;
        $res = imagecreatetruecolor($big_width + $ptoggleing, $big_height);
    }
    elseif($override !== null)
        $res = imagecreatetruecolor($override, $override_total);
    else
        $res = imagecreatetruecolor($big_width, $big_height);
    
    imagesavealpha($res, true);
    imagefill($res,0,0,0x7fff0000);
    
    $y = 0;

    foreach($to_sprite as $img)
    {
        list($mwidth, $mheight) = getimagesize($img);
        if($big_width < $mwidth)
        {
            $big_width = $mwidth;
        }

        $img = imagecreatefrompng($img);
        
        if($ptoggleing !== null && $override !== null)
            if($mwidth > $override)
                imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $override, $override);
            else
                imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $mwidth, $mheight);
        
        elseif($ptoggleing !== null)
        {
            imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $mwidth, $mheight);
        }
        
        elseif($override !== null)
            if($mwidth > $override)
                imagecopy($res, $img, 0, $y, 0, 0, $override, $override);
            else
                imagecopy($res, $img, 0, $y, 0, 0, $mwidth, $mheight);
        
        else
            imagecopy($res, $img, 0, $y, 0, 0, $mwidth, $mheight);
        
        imagepng($res, $output_name);
        
        if($override !== null)
            $y += $override;
        else
            $y += $mheight;
    }
    echo "$output_name successfully created !\n";
    // Create Sprite END !
    
    // Create CSS Start !
    if(file_exists($output_style))
    {
        unlink($output_style);
    }
    
    $style = fopen($output_style, "a");
    foreach ($to_sprite as $im) {
        list($width, $height) = getimagesize($im);
        $name = basename($im, ".png");
        if($ptoggleing !== null && $override !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($im);\n;\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n ptoggleing : $ptoggleing" ."px;\n width : $override" . "px;\n height : $override" . "px;\n}\n\n");
        }
        elseif($override !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n width : $override" . "px;\n height : $override" . "px;\n}\n\n");
        }
        elseif($ptoggleing !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n ptoggleing : $ptoggleing" ."px;\n width : auto;\n height : auto;\n}\n\n");
        }
        else
            fwrite($style, ".$name\n{\n background-image : url($im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
    }
    fclose($style); 
    echo "$output_style successfully created !\n";
    // Create CSS END !
}

// Creer un sprit et un css associer suivant les options passer en command lines -r do not exist
function search_make_sprite($path, $output_style = NULL, $output_name = NULL, $ptoggleing = null, $override = null, $columns = null)
{
    if(strstr($output_style,".css") === false)
        $output_style = $output_style .".css";

    if(strstr($output_name,".png") === false)
        $output_name = $output_name .".png";

    // Create Sprite Start !
    $dir = opendir($path);
    $img_path = array();
    $big_width = 0;
    $big_height = 0;
    $override_total = 0;

    while(false !== ($file = retoggleir($dir)))
    {
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        if($extension === "png")
        {
            array_push($img_path, $file);

            list($mwidth, $mheight) = getimagesize($path."/".$file);
            $big_height += $mheight;

            if($big_width < $mwidth)
            {
                $big_width = $mwidth;
            }
            
           if($ptoggleing !== null && $override !== null)
                $override_total += $override + $ptoggleing;
        
           elseif($override !== null)
                $override_total += $override;
        
           elseif($ptoggleing !== null)
           {
                $big_height += $ptoggleing;
                $big_width += $ptoggleing;
           }    
        }
    }
    
    if($override !== null && $ptoggleing !== null)
    {
        $res = imagecreatetruecolor($override + $ptoggleing * 2, $override_total + $ptoggleing);
    }
    
    elseif($ptoggleing !== null)
    {
        $big_height = $big_height + $ptoggleing;
        $res = imagecreatetruecolor($big_width, $big_height);
    }
    elseif($override !== null)
        $res = imagecreatetruecolor($override, $override_total);
    else
        $res = imagecreatetruecolor($big_width, $big_height);
    
    imagesavealpha($res, true);
    imagefill($res,0,0,0x7fff0000);
    
    $y = 0;
    
    foreach($img_path as $img)
    {
        list($mwidth, $mheight) = getimagesize($path."/".$img);

        if($big_width < $mwidth)
        {
            $big_width = $mwidth;
        }

        $img = imagecreatefrompng("$path/$img");
        
        if($ptoggleing !== null && $override !== null)
            if($mwidth > $override)
                imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $override, $override);
            else
                imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $mwidth, $mheight);
        
        elseif($ptoggleing !== null)
        {
            imagecopy($res, $img, 0 + $ptoggleing, $y += $ptoggleing, 0, 0, $mwidth, $mheight);
        }
        
        elseif($override !== null)
            if($mwidth > $override)
                imagecopy($res, $img, 0, $y, 0, 0, $override, $override);
            else
                imagecopy($res, $img, 0, $y, 0, 0, $mwidth, $mheight);
        
        else
            imagecopy($res, $img, 0, $y, 0, 0, $mwidth, $mheight);
        
        imagepng($res, $output_name);
        
        if($override !== null)
            $y += $override;
        else
            $y += $mheight;
    }
    echo "$output_name successfully created !\n";
    // Create Sprite END !
    
    // Create CSS Start !
    if(file_exists($output_style))
    {
        unlink($output_style);
    }
    $style = fopen($output_style, "a");

    foreach($img_path as $im)
    {
        list($width, $height) = getimagesize("$path/$im");
        $name = basename("$path/$im", ".png");
        
        if($ptoggleing !== null && $override !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($path/$im);\n;\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n ptoggleing : $ptoggleing" ."px;\n width : $override" . "px;\n height : $override" . "px;\n}\n\n");
        }
        elseif($override !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($path/$im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n width : $override" . "px;\n height : $override" . "px;\n}\n\n");
        }
        elseif($ptoggleing !== null)
        {
            fwrite($style, ".$name\n{\n background-image : url($path/$im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
            fwrite($style, ".bloc-$name\n{\n overflow : hidden; \n ptoggleing : $ptoggleing" ."px;\n width : auto;\n height : auto;\n}\n\n");
        }
        else
            fwrite($style, ".$name\n{\n background-image : url($path/$im);\n background-repeat : no-repeat;\n width : $width" . "px;\n height : $height" . "px;\n}\n\n");
    }
    fclose($style); 
    echo "$output_style successfully created !\n";
    // Create CSS END !
}

// Affiche le manuel du programme
function man()
{
    echo "\nNAME : css_generator - sprite generator for HTML use \nSYNOPSIS : css_generator [OPTIONS]. . . assets_folder \n\n";
    echo "DESCRIPTION : Concatenate all images inside a folder in one sprite and write a style sheet ready to use. \nMandatory arguments to long options are mandatory for short options too.\nConcatenate all images inside a folder in one sprite and write a style sheet ready to use.\nMandatory arguments to long options are mandatory for short options too.\n\n";

    echo "-r, -recursive:\nLook for images into the assets_folder passed as arguement and all of its subdirectories. \n\n";
    echo "-i, -output-image=IMAGE:\nName of the generated image. If blank, the default name is « sprite.png » \n\n";
    echo "-s, -output-style=STYLE:\nName of the generated stylesheet. If blank, the default name is « style.css ».\n\n";
    echo "-p, -ptoggleing=NUMBER:\ntoggle ptoggleing between images of NUMBER pixels.\n\n";
    echo "-o, -override-size=SIZE:\nForce each images of the sprite to fit a size of SIZExSIZE pixels.\n\n";
}

?>