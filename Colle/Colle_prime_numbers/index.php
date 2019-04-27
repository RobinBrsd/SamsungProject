<?php 

array_splice($argv, 0, 1);
$number = $argv;

if(sizeof($number) === 1)
    prime_numbers($number);
else
    echo "Programme need atleat one argument and only ONE argument to be functional !\nExemple : 'php index.php 42'.\n";

function verif_number($number)
{
    $val = array_pop(($number));
    $find_pt  = '.';
    $res = strpos($val, $find_pt);
    
    if(is_numeric($res))
    {
        echo "Programme doesn't allow use of float number\n";
        return false;
    }
    elseif(is_numeric($val))
        return $val;
    else
    {
        echo "Programme work only with number !\n";
        return false;
    }
}

function is_prime($val)
{
    for($i = 2; $i < $val; $i++)
    {
        if($val%$i == 0)
        {   
            return false;
        }
    }
}

function recu($number)
{
    static $i = 0;
    $i++;
    
    $a = $number/2;
    $b = $number/3;
    $c = $number/5;
    
    if($i == 1)
    {
        echo "$number = ";
        $saved = $number;
    }
    
    static $res = "";
    if(is_int($a))        
    {
        $res .= "2 x ";
        recu($a);
    }
    elseif(is_int($b))
    {
        $res .= "3 x ";
        recu($b);
    }
    elseif(is_int($c))
    {
        $res .= "5 x 5";
        recu($b);
    }
    else
    {
        echo $res;
    }
}

function prime_numbers($number)
{
    if(verif_number($number) !== false)
    {
        $val = verif_number($number);
        
       if(is_prime($val) !== false)
        {
            echo "$val est premier\n";
            return true;
        }
        else
        {
            recu($val);
            return false;
        }
    }
    else
        exit;
}

?>