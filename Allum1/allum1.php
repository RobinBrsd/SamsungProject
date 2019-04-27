<?php 

if(!isset($argv[1])) {
    echo "Programmes Must Have 2 Parameter !\nUsage : 'php allum1.php \$nbLines \$max'\n";
    exit;
}
if (isset($argv[2])) {
    error($argv[1], $argv[2]);
} else {
    error($argv[1], -1);
}

// @function error
// Check Param Passed In Command Line And Display Error Message
function error($line, $max)
{
    $GLOBALS['max'] = $max;
    $GLOBALS['lines'] = $line;
    if ($max >= 0) {
        if ($line > 0 && $max > 0) {
            setGrid($line);
        } else {
            echo "Params Invalides !\nUsage : 'php allum1.php \$nbLines \$max'\n";
            return;
        }
    } else {
        echo "Programmes Must Have 2 Parameter !\nUsage : 'php allum1.php \$nbLines \$max'\n";
        return;
    }
}

function spacing($line) {
    $spaceCount = 0;
    for ($i = 0; $i < $line; $i++) {
        $spaceCount += 2;
    } 
    return $spaceCount - 1;
}

// @function setGrid
// Display The Game Grid 
function setGrid($line) 
{
    $grid = [];  
    $atm = 1;
    for ($i = 0; $i < $line; $i++) {
        $lineTab = [];
        for ($y = 0; $y < $atm; $y++) {
            array_push($lineTab, "|");
        }
        array_push($grid, $lineTab);
        $atm += 2;
    }
    $base = spacing($line);
    $GLOBALS['grid'] = $grid;
    $GLOBALS['base'] = $base;
    $GLOBALS['WIP'] = 'IA';
    display($grid, $base);
}

function displayStar($base) 
{
    for ($i = 0; $i <= $base + 1; $i++) {
        echo "\033[34m*\033[0m";
    }
    echo "\n";    
}

function displaySpace($base, $line) 
{
    for ($i = 0; $i < $base / 2 - $line; $i++) {
        echo " ";
    }
}

function display($grid, $base)
{
    displayStar($base);
    $nbLine = 1;
    foreach ($grid as $line) {
        echo "\033[34m*\033[0m";
        displaySpace($base, $nbLine);
        foreach ($line as $value) {
            echo "\033[1;33m". $value."\033[0m";
        }
        displaySpace($base, $nbLine);
        echo "\033[34m*\033[0m\n";
        $nbLine++;
    }
    displayStar($base);
    turn();
}

function turn() 
{
    $GLOBALS['WIP'] = ($GLOBALS['WIP'] === "Player") ? "IA" : "Player";
    if ($GLOBALS['WIP'] === "IA")
        IA();
    else 
        player();
}

function IA() 
{
    $max = $GLOBALS['max'];
    $bigSize = sizeof($GLOBALS['grid']);
    $optLines = [];
    $i = 1;
    foreach($GLOBALS['grid'] as $lines) {
        $count = 0;
        foreach($lines as $val) {
            if($val == "|") {
                $count++;
            }
            if($count >= 1) {
                if(!in_array($i, $optLines))
                    array_push($optLines, $i);
            }
        }
        $i++;
    }
    $key = array_rand ($optLines, 1);
    $line = $optLines[$key];
    $line--;
    $baton = 0;
    
    if(sizeof($optLines) == 2) {
        $line = max($optLines);
        $line--;
        $matche = $baton;
    }

    foreach($GLOBALS['grid'][$line] as $val) {
        if($val == "|"){
            $baton++;
        }
    }
    $matche = rand($GLOBALS['Pmatche'] - 1, $GLOBALS['Pmatche'] + 1);
    if(sizeof($optLines) == 1) {
        $matche = $baton - 1;
    }
    if(sizeof($optLines) == 2) {
        $matche = $baton;
    }
    
    if($matche == 0)
        $matche++;
    if($matche > $max)
        $matche--;
    while($matche > $baton){
        $matche--;
    }
    if($matche == $baton)
        $matche--;
    while($matche <= 0){
        $matche++;
    }

    echo "\n\033[31mAI's turn...\n";
    echo "AI removed $matche match(es) from line ".($line + 1)."\n";
    $size = sizeof($GLOBALS['grid'][$line]);
    $i = 0;
    while($size >= 0 && $i < $matche) {
        if($size < sizeof($GLOBALS['grid'][$line])) {
            if($GLOBALS['grid'][$line][$size] === " ") {
                $size--;
                $matche++;
            } else {
                if(array_key_exists($size, $GLOBALS['grid'][$line])) {
                    $GLOBALS['grid'][$line][$size] = " ";
                }
                $size--;
            }
            $i++;
        } else {
            $size--;
        }
    }
    $line++;
    checkWinIA($GLOBALS['grid'], $GLOBALS['base']);
    display($GLOBALS['grid'], $GLOBALS['base']);
}

function errorInput($line, $matche) 
{
    if(is_numeric($line)) {
        if($line <= 0 || $line > sizeof($GLOBALS['grid'])) {
            echo "Error: this line is out of range\n";
            player();
        }
    } else {
        echo "Error: invalid input (positive number expected)\n";
        player();
    }
    if($matche <= 0) {
        echo "Error: you have to remove at least one match\n";
        player();
    } elseif ($matche > $GLOBALS['max']) {
        echo "Error: cannot remove more than ".$GLOBALS['max']." matches / turn\n";
        player();
    }
}

function checkGridError($grid, $line, $matche)
{
    $count = 0;
    $line--;
    foreach($grid[$line] as $case) {
        if($case === "|")
            $count++;
    }
    if($count < $matche) {
        echo "Error: not enough matches on this line\n";
        player();
    }
}

function player() 
{
    echo "\n\033[1;32mYour Turn:\n";
    $line = readline('Line: ');
    $matche = readline('Matches: ');
    $GLOBALS['Pmatche'] = $matche;
    errorInput($line, $matche);
    checkGridError($GLOBALS['grid'], $line, $matche);
    echo "Player removed $matche match(es) from line $line\n";
    
    if ($line <= $GLOBALS['lines'] && $matche <=  $GLOBALS['max'] && is_numeric($matche) && is_numeric($line)) {
        $line--;
        $size = sizeof($GLOBALS['grid'][$line]);
        $i = 0;
        while($size >= 0 && $i < $matche) {
            if($size < sizeof($GLOBALS['grid'][$line])) {
                if($GLOBALS['grid'][$line][$size] === " ") {
                    $size--;
                    $matche++;
                } else {
                    if(array_key_exists($size, $GLOBALS['grid'][$line])) {
                        $GLOBALS['grid'][$line][$size] = " ";
                    }
                    $size--;
                }
                $i++;
            } else {
                $size--;
            }
        }
        checkWin($GLOBALS['grid'], $GLOBALS['base']);
        display($GLOBALS['grid'], $GLOBALS['base']);
    }
}

function checkWin($grid, $base)
{
    $count = 0;
    foreach($grid as $lines) {
        foreach($lines as $case) {
            if($case === "|")
                $count++;
        }
    }
    if($count === 0) {
        displayStar($base);
        $nbLine = 1;
        foreach ($grid as $line) {
            echo "\033[34m*\033[0m";
            displaySpace($base, $nbLine);
            foreach ($line as $value) {
                echo $value;
            }
            displaySpace($base, $nbLine);
            echo "\033[34m*\033[0m\n";
            $nbLine++;
        }
        displayStar($base);
        echo "You lost, too bad...\n";
        exit;
    }
}

function checkWinIA($grid, $base)
{
    $count = 0;
    foreach($grid as $lines) {
        foreach($lines as $case) {
            if($case === "|")
                $count++;
        }
    }
    if($count === 0) {
        displayStar($base);
        $nbLine = 1;
        foreach ($grid as $line) {
            echo "\033[34m*\033[0m";
            displaySpace($base, $nbLine);
            foreach ($line as $value) {
                echo $value;
            }
            displaySpace($base, $nbLine);
            echo "\033[34m*\033[0m\n";
            $nbLine++;
        }
        displayStar($base);
        echo "\n\033[31mI lost... snif... but I'll get you next time!!\n";
        exit;
    }
}