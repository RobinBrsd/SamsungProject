<?php 

function colle($x, $y, $coords)
{   
    $z = 0;
    $a = 1;
    $b = 0;

    $coords_a1 = $coords[0][0]; 
    $coords_a2 = $coords[0][1] + 1;
    
    $coords_b1 = $coords[1][0];
    $coords_b2 = $coords[1][1] + 1;

    while($z < $y)
    {
        if($a > $b)
        {
            for($i = 0; $i < $x; $i++)
            {
                if($i == $x - 1) {
                    echo "+---+\n";
                }
                else {
                    echo "+---";
                }
            }
            $b++;
        }

        if($b == $a)
        {
            for($i = 0; $i < $x; $i++)
            {
                // if($coords_b1 >= 0 && $coords_b1 <= $x && $coords_b2 >= 0 && $coords_b2 <= $x) { }

                if($coords_a1 == $i && $coords_a2 == $a) {
                    if($i == $x - 1) {
                        echo "| X |\n";
                    }
                    else {
                        echo "| X ";
                    }
                }

                if($coords_b1 == $i && $coords_b2 == $a) {
                    if($i == $x - 1) {
                        echo "| X |\n";
                    }
                    else
                        echo "| X ";
                }

                elseif($i == $x - 1) {
                    echo "|   |\n";
                }
                else
                    echo "|   ";
            }
            $a++;
        }

        if($z == $y - 1) {
            for($i = 0; $i < $x; $i++)
            {
                if($i == $x - 1) {
                    echo "+---+\n";
                }
                else {
                    echo "+---";
                }
            }
        }

        $z++;
    }
}


colle(5 , 3, [[1,1], [2,2]]);

?>