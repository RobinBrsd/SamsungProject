<?php 

function sapin($nb, $nbMax){

    $star = "*";
    $maxBase = $nbMax * 7 / $nbMax;
    $center = $maxBase / 2;

    for($i = 0; $i < $nbMax; $i++){
        if($nb == 1){
            while($i < $center - 1){
                echo " ";
                $i++;
            }
            echo $star."\n";
        }

        for($i = 0; $i < $nb + 4; $i++){
            while($i < $center - 2){
                echo " ";
                $i++;
            }
            echo $star;
        }
        echo "\n";

        for($i = 0; $i < $nb + 5; $i++){
            while($i < $center - 3){
                echo " ";
                $i++;
            }
            echo $star;
        }
        echo "\n";

        if($nb == 1){
            $base = $nb + 6 * $nb;
        }
        else {
            $base = $nb + 6 * $nb - 1;
        }

        for($i = 0; $i < $base; $i++){
            while($i < $center - 4){
                echo " ";
                $i++;
            }
            echo $star;
        }
        echo "\n";

        if($nb == 1 && $nbMax > 1){
            for($i = 0; $i < $base - 1; $i++){
                while($i < $center - 3){
                    echo " ";
                    $i++;
                }
                echo $star;
            }
            echo "\n"; 
        }
    }

    if($nb == $nbMax){
        if($nb == 1){
            $i = 0;
            while($i < $center - 1){
                echo " ";
                $i++;
            }
            echo "|\n";
        }
        else {
            for($i = 0; $i < $nbMax; $i++){
                while($i < $center - 2){
                    echo " ";
                    $i++;
                }
                echo "|||\n";
            }
        }
    }
}

if($argv[1] > 0){
    for($i = 1; $i - 1 < intval($argv[1]); $i++){
        sapin($i, $argv[1]);
    }
}

?>