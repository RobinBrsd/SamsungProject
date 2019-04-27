<?php 

class pushSwap 
{
    public $listA = [];
    public $listB = [];
    public $sizeA;
    public $operations = [];

    public function __construct($list)
    {
        $this->listA = $list;
        $this->sizeA = sizeof($list);

        //while(sizeof($this->listA) > 1) {
            $this->tri4();
        //} 
        while(sizeof($this->listB) >= 1) {
            $this->pa();
            array_push($this->operations, "pa");
        }

        // Display Resultat of the Script
        $this->display();
    }

    public function display()
    {
        echo implode(" ", $this->operations);
        echo "\n";
        // $operations = sizeof($this->operations);
        // echo "Operations : $operations\n";
        //var_dump($this->listA);
    }

    public function tri()
    {
        for($i = 0; $i <= $this->sizeA; $i++) {
            if(isset($this->listA[$i + 1])) {
                $min = array_search(min($this->listA), $this->listA);
                $halfSize = round(sizeof($this->listA) / 2) - 1;

                if($this->listA[1] == $this->listA[$min]) {
                    $this->sa();
                    array_push($this->operations, "sa");
                }

                if($this->listA[0] == $this->listA[$min]) {
                    $this->pb();
                    array_push($this->operations, "pb");
                    $this->tri();
                }
                while($this->checkVal($this->listA[0])) {
                    if($min <= $halfSize) {
                        $this->ra();
                        array_push($this->operations, "ra");
                    }
                    if($min > $halfSize) {
                        $this->rra();
                        array_push($this->operations, "rra");
                    }
                }
            }
        }
    }

    public function checkval($val) {
        for($i = 0; $i < sizeof($this->listA); $i++) {
            if($val > $this->listA[$i]) {
                return TRUE;
            }
        }
    }

    public function tri4()
    {
        for($i = 0; $i <= $this->sizeA; $i++) {
            if($this->listA[0] > $this->listA[1]) {
                $this->sa();
                echo "sa ";
            }
            if(end($this->listA) < $this->listA[0]) {
                $this->rra();
                echo "rra ";
            }
            if(isset($this->listA[$i + 1])) {
                $key = array_search($this->listA[$i], $this->listA);
                if($this->listA[$i] > $this->listA[$i + 1]) {
                    $halfSize = round($this->sizeA / 2);
                    if($key < $halfSize) {
                        $this->ra();
                        echo "ra ";
                    }
                    if($key >= $halfSize) {
                        $this->rra();
                        echo "rra ";
                    }
                }
            }
        }
    }

    public function sa()
    {
        if ($this->sizeA >= 2) {
            $a = $this->listA[0];
            $b = $this->listA[1];
            $this->listA[0] = $b;
            $this->listA[1] = $a;
        }
    }

    public function sb()
    {
        if(sizeof($this->listB) >= 2) {
            $a = $this->listB[0];
            $b = $this->listB[1];
            $this->listB[0] = $b;
            $this->listB[1] = $a;
        }
    }

    public function sc()
    {
        $this->sb();
        $this->sa();
    }

    public function pa()
    {
        if(sizeof($this->listB) >= 1) {
            array_unshift($this->listA, $this->listB[0]);
            array_shift($this->listB);
        }
    }

    public function pb()
    {
        if($this->sizeA >= 1) {
            array_unshift($this->listB, $this->listA[0]);
            array_shift($this->listA);
        }
    }

    public function ra()
    {
        $a = $this->listA[0];
        array_shift($this->listA);
        array_push($this->listA, $a);
    }

    public function rb()
    {
        $a = $this->listB[0];
        array_shift($this->listB);
        array_push($this->listB, $a);
    }

    public function rr()
    {
        $this->ra();
        $this->rb();
    }

    public function rra()
    {
        $a = array_pop($this->listA);
        array_unshift($this->listA, $a);
    }

    public function rrb()
    {
        $a = array_pop($this->listB);
        array_unshift($this->listB, $a);
    }

    public function rrr()
    {
        $this->rra();
        $this->rrb();
    }
}

$list = $argv;
array_shift($list);
$prog = new pushSwap($list);
//$prog = new pushSwap(generateList(100));

function generateList($nb)
{
    $list = [];
    for($i = 0; $i < $nb; $i++) {
        $val = rand(1, 999);
        array_push($list, $val);
    }
    return $list;
}