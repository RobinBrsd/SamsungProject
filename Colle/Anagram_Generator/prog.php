<?php

array_splice($argv, 0,1);
$opt = $argv[0];

function search($name){
    $files = "dico.txt";
    $lines = file($files);

    $name = $name."\n";
    foreach($lines as $line){
        if($line == $name){
            return true;
        }
    }
    return false;
}

function makeAnagram($name){
    echo $name." "."Generating Anagram...\n";

    $files = "dico.txt";
    $lines = file($files);
    $length = strlen($name);

    foreach($lines as $line){
        if(strlen($line) == $length + 1){
            if(check($name) != false)
                checkLine($line, $name);
            else
                break;
        }
    }
}

function checkLine($line, $name){
    $tab = str_split($name);

    $i = 0;
    foreach($tab as $letter){
        $pos = strpos($line, $letter);
        if($pos === false){
            CONTINUE;
        }
        else {
            $i++;
        }
    }

    global $argv;
    if(isset($argv[1])){
        $nb = $argv[1];
        if($i == strlen($line) - ($nb - 1)){
            $res = [];
            foreach($tab as $letter){
                $pos = strpos($line, $letter);
                if($pos === false){
                    
                }
                else {
                    array_push($res, $letter); 
                }
            }
            var_dump($res);
            
        }

    }
    else {
        if($i == strlen($line) - 1){
            echo $line;
        }
    }
}

function check($name){
    global $argv;
    $length = strlen($name);
    if(isset($argv[1])){
        $nb = $argv[1];
        if($nb > $length || $nb < 0 || $nb == $length){
            echo "Veuillez entrer un nombre valide\n";
            return false;
        }
        return true;
    }
    return true;
}

function index($name){
    if(search($name) != false){
        echo "Word Found !\n";
        makeAnagram($name);
    }
}

index($opt);

?>