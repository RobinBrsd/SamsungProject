<?php 

array_splice($argv, 0, 1);
static $basePlateaux = "IIIIIIIIIIIIIIIIIIIIIIIII";

if($argv[0] == "start")
{
    initGame();
}

else
{
    echo "--Game.php :\n\n";
    echo "Enter 'start' to start playing !\n";
    echo "Full exemple : 'php game.php start' !\n";
}

function initGame()
{    
    global $basePlateaux;
    
    echo "--Game.php :\n\n";
    echo "There is the starting pattern = " .$basePlateaux ."\n";
    echo "U can remove 1, 2, or 3 allumettes each turn.\n";
    echo "Enter 'YourNumbers' to remove allumettes from the pattern.\n";
    echo "Full exemple : 'php game.php 3' !\n\n";
    echo "Game Starting !\n";
    
    play();
}

function play()
{
    global $basePlateaux;
        
    $size = strlen($basePlateaux);
    
    echo "\n------------------------------------------------------------------------------\n\n";
    echo "Ur turn to play :\n\n--:: ";

    
    if($size <= 0)
    {
        echo " *** U WIN ! *** \n\n";
        exit;
    }
    
    switch (trim(fgets(STDIN))) {
    case 1:
        if($size >= 3)    
            $x = rand(-3, -1);
        elseif($size === 2)
            $x = rand(-2, -1);
        elseif($size === 1)
            $x = -1;
            
        if($x === -1)
            $nb = 1 ." allumette !";
        elseif($x === -2)
            $nb = 2 . " allumettes !";
        elseif($x === -3)
            $nb = 3 . " allumettes !";
              
        $newPlateaux = substr_replace($basePlateaux , "", -1);
        $basePlateaux = $newPlateaux;  
        $atmSize = strlen($basePlateaux); 
            
        echo "\nU choose to remove 1 allumette !\n"; 
        echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n\n";            
        echo "------------------------------------------------------------------------------\n\n";
        
        if($atmSize <= 0)
        {
            echo " --:: *** U LOOSE ***\n\n";
            break;
        }
        
        else
        {
            $newPlateaux = substr_replace($newPlateaux , "", $x);
            $basePlateaux = $newPlateaux;
            echo "IA choose to remove " .$nb. "\n";   
            echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n";
            play(); 
        }    
        break;
            
    case 2:
        if($size >= 3)    
            $x = rand(-3, -1);
        elseif($size === 2)
            $x = -2;
        elseif($size === 1)
            $x = -1;
            
        if($x === -1)
            $nb = 1 ." allumette !";
        elseif($x === -2)
            $nb = 2 . " allumettes !";
        elseif($x === -3)
            $nb = 3 . " allumettes !";
                            
        $newPlateaux = substr_replace($basePlateaux , "", -2);
        $basePlateaux = $newPlateaux;
        $atmSize = strlen($basePlateaux); 
            
        echo "\nU choose to remove 2 allumettes !\n"; 
        echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n\n";
        echo "------------------------------------------------------------------------------\n\n";
            
        if($atmSize <= 0)
        {
            echo " --:: *** U LOOSE ***\n\n";
            break;
        }
        
        else
        {
            $newPlateaux = substr_replace($newPlateaux , "", $x);
            $basePlateaux = $newPlateaux;
            echo "IA choose to remove " .$nb. "\n";   
            echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n";
            play(); 
        }       
        break;
                
    case 3:
        if($size >= 3)    
            $x = rand(-3, -1);
        elseif($size === 2)
            $x = rand(-2, -1);
        elseif($size === 1)
            $x = -1;
            
        if($x === -1)
            $nb = 1 ." allumette !";
        elseif($x === -2)
            $nb = 2 . " allumettes !";
        elseif($x === -3)
               $nb = 3 . " allumettes !";
            
        $newPlateaux = substr_replace($basePlateaux , "", -3);
        $basePlateaux = $newPlateaux;
        $atmSize = strlen($basePlateaux);
            
        echo "\nU choose to remove 3 allumettes !\n"; 
        echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n\n";
        echo "------------------------------------------------------------------------------\n\n";
                
        if($atmSize <= 0)
        {
            echo " --:: *** U LOOSE ***\n\n";
            break;
        }
        
        else
        {
            $newPlateaux = substr_replace($newPlateaux , "", $x);
            $basePlateaux = $newPlateaux;
            echo "IA choose to remove " .$nb. "\n";   
            echo "Allumettes remaining : " .$basePlateaux. " (".strlen($basePlateaux).")\n";
            play(); 
        }    
        break;
        
    case "exit":
        echo "\nOhhhhhhhhhhh :'( \n"; 
        echo "Bye !\n";
        break;
                
    default:
        echo "--Game.php :\n\n";    
        echo "U can only remove 1, 2 or 3 allumettes by turn !\n";
                
        play();
    }
}

?>