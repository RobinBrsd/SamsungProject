<?php 

$tab = $argv;
array_shift($tab);
for($i = 0; $i < sizeof($tab); $i++) {
    $key = array_search("npi.php", $tab);
    if($key) {
        $tab[$key] = "*";
    }
}

calcul($tab);

function ope(&$tab)
{
    for($i = sizeof($tab) - 1; $i > 0; $i--) {
        if(isset($tab[$i])){
            if(!is_numeric($tab[$i]) && $tab[$i] == "*" && $tab[$i] != "U") {
                $ope = $tab[$i];
                $tab[$i] = "U";
                return $ope;
            }
        }
    }
}

function a(&$tab)
{
    for($i = sizeof($tab) - 1; $i >= 0; $i--) {
        if(isset($tab[$i])){
            if(is_numeric($tab[$i]) && $tab[$i] != "*" && $tab[$i] != "U") {
                $a = $tab[$i];
                $tab[$i] = "U";
                return $a;
            }
        }
    }
}

function b(&$tab)
{
    for($i = sizeof($tab) - 1; $i >= 0; $i--) {
        if(isset($tab[$i])){
            if(is_numeric($tab[$i]) && $tab[$i] != "*" && $tab[$i] != "U") {
                $b = $tab[$i];
                $tab[$i] = "U";
                return $b;
            }
        }
    }
}

function calcul($tab)
{
    $ope = ope($tab);
    $a = a($tab);
    $b = b($tab);

    var_dump($tab);
    echo "a : $a ope : $ope b : $b\n";
    calc($a, $ope, $b, $tab);
}

function calc($a, $ope, $b, $tab)
{
    $x = 0;
    if($ope == "+")
        $x = $a + $b;
    if($ope == "-")
        $x = $a - $b;
    if($ope == "*")
        $x = $a * $b;
    if($ope == "/" && $b) {
        if($b === 0) {
            echo "Division By Zero";
        }
        $x = $a + $b;
    }
    if($ope == "%")
        $x = $a % $b;
    if($ope == "NEG")
        $x = $a * -1;
    
    $Ntab = [];
    if(sizeof($Ntab) == 1 && is_numeric($tab[0])) {
        echo "Result : $tab[0]\n";
        exit;
    } else {
        array_push($tab, $x);
        foreach($tab as $val) {
            if($val != "U") {
                array_push($Ntab, $val);
            }
        }
        calcul($Ntab);
    }
}


