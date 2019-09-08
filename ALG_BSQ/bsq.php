<?php

$map = main($argv);
parseMap($map);

// Execute the script and check if files or program
function main($argv) {
    if(isset($argv[1])) {
        $file = $argv[1];
        $map = generateMap($file);

    } else {
        $string = shell_exec("perl generator.pl 600 600 600");
        $map = generateMapFromString($string);
    }
    return $map;
}

// Return an array of the map from a files
function generateMap($file) {
    $tmp = [];
    
    $f = fopen($file,"r");
    while(!feof($f))  {
        $line = fgets($f);
        array_push($tmp, $line);
    }
    fclose($f);

    $map = [[]];
    foreach($tmp as $line) {
        $col = str_split($line);
        array_push($map, $col);
    }

    foreach($map as $key => $line){
        if(sizeof($line) > 20)
            array_pop($map[$key]);
    }
    // displayMap($map);
    // echo "\n\n";
    return $map;
}

// Return an array of the map from a string
function generateMapFromString($string) {
    $tmp = explode(PHP_EOL, $string);
    array_shift($tmp);
    array_pop($tmp);

    $map = [[]];
    foreach($tmp as $line) {
        $col = str_split($line);
        array_push($map, $col);
    }

    // displayMap($map);
    // echo "\n\n";
    return $map;
}

// Return Largeur and Longueur of the map
function getMapSize($map) {
    $longueur = sizeof($map) - 1;
    $largeur = sizeof($map[1]) - 1;

    $dimension = ["longueur" => $longueur, "largeur" => $largeur];

    return $dimension;
}

// Parse the map to a int map and return it
function parseMap($map) {
    $size = getMapSize($map);
    $lng = $size['longueur'];
    $lrg = $size['largeur'];

    $fLine = [];
    for($i = 0; $i <= $lrg; $i++){
        array_unshift($fLine, "0");
    }
    $map[0] = $fLine;

    foreach($map as $key => $line) {
        array_unshift($map[$key], '0');
    }

    for($i = 1; $i <= $lng; $i++){
        for($y = 1; $y <= $lrg + 1; $y++){
            if($map[$i][$y] === "o") {
                $map[$i][$y] = "0";
            } else {
                $valTop = $map[$i - 1][$y];
                $valLeft = $map[$i][$y - 1];
                $valCorner = $map[$i - 1][$y - 1];
                $min = min($valTop, $valLeft, $valCorner);
                $res = $min + 1;
                $map[$i][$y] = $res;
            }
        }
    }
    // displayMap($map);
    // echo "\n\n";
    unparseMap($map);
}

// Get Stats of Each Case And Return the Max Value In the Map
function getStats($map) {
    $tab = [[]];
    foreach($map as $keyM => $line) {
        if($keyM !== 0){
            foreach($line as $keyL => $case) {
                $stats = ["posM" => $keyM, "posL" => $keyL, "val" => $case];
                array_push($tab, $stats);
            }
        }
    }

    $max = max(array_column($tab, 'val'));
    $caseStart = [];
    foreach($map as $keyM => $line) {
        if($keyM !== 0){
            foreach($line as $keyL => $case) {
                if($case == $max) {
                    $stats = ["posM" => $keyM, "posL" => $keyL, "val" => $case];
                    array_push($caseStart, $stats);
                    break;
                }
            }
        }
    }

    return $caseStart;
}

// Return the final map
function unparseMap($map) {
    $caseStart = getStats($map);

    for($i = 0; $i < $caseStart[0]['val']; $i++) {
        for($y = 0; $y < $caseStart[0]['val']; $y++) {
            $posM = $caseStart[0]['posM'] - $i;
            $posL = $caseStart[0]['posL'] - $y;

            if($posM < 0)
                $posM = 0;
            if($posL < 0)
                $posL = 0;

            if(array_key_exists($map[$posM][$posL], $map)){
                $map[$posM][$posL] = "x";
            }
        }
    }

    array_shift($map);
    foreach($map as $keyM => $line) {
        array_shift($map[$keyM]);      
    }

    foreach($map as $keyM => $line) {
        foreach($line as $keyL => $case) {
            if($case === "0")
                $map[$keyM][$keyL] = "o";
            if($case !== "0" && $case !== "x" && $case !== "o")
                 $map[$keyM][$keyL] = ".";
        }       
    }
    displayMap($map);
}

// Display a map
function displayMap($map){
    $lastKey = sizeof($map[1]) - 1;
    foreach($map as $line) {
        foreach($line as $key => $val) {
            if($key == $lastKey) {
                echo $val;
                echo "\n";
            } else {
                echo $val;
            }
        }
    }
}