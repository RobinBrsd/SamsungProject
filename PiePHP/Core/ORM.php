<?php 

class ORM
{

    private $bdd;
    
    public function __construct()
    {
        $this->bdd = new PDO('mysql:host=localhost;dbname=PiePHP;charset=utf8', 'root', '');
    }

    public function setValues($tab)
    {
        $value = implode(',', $tab);
        $tab = explode(",", $value);
        $res = [];
        foreach ($tab as $val) {
            $val = '"'.$val.'"';
            array_push($res, $val);
        }
        $val = implode(",", $res);
        return $val;
    }

    public function create($table, $fields)
    {
        $bdd = $this->bdd;

        $key = implode(',', array_flip($fields));
        $val = $this->setValues($fields);

        $req = $bdd->prepare("INSERT INTO $table($key) VALUES($val);");
        $req->execute();

        return $bdd->lastInsertId(); 
    }

    public function read($table, $id)
    {
        $bdd = $this->bdd;

        $req = $bdd->query("SELECT * FROM $table WHERE id = $id");
        $resultat = $req->fetchAll(PDO::FETCH_ASSOC);

        return $resultat; 
    }

    public function update($table, $id, $fields)
    {
        $bdd = $this->bdd;

        $str = "";
        $i = 1;
        foreach ($fields as $key => $val) {
            if ($i == sizeof($fields)) {
                $str .= $key . " = '" .$val."'";
            } else {
                $str .= $key . " = '" .$val."', ";
            }
            $i++;
        }
        $req = $bdd->prepare("UPDATE $table SET $str WHERE id = $id");
        $req->execute();

        return $req->execute();
    }

    public function delete($table, $id)
    {
        $bdd = $this->bdd;

        $req = $bdd->prepare("DELETE FROM $table WHERE id = $id");
        $req->execute();

        return $req->execute();
    }

    public function find($table, $params = array(
        'WHERE' => '28',
        "ORDER BY" => 'id ASC',
        'LIMIT' => '5'
    )
    ) {
        $bdd = $this->bdd;
        
        $id = $params['WHERE'];
        $order = $params['ORDER BY'];
        $limit = $params['LIMIT'];

        $req = $bdd->query("SELECT * FROM $table WHERE id = $id ORDER BY $order LIMIT $limit");
        $resultat = $req->fetchAll(PDO::FETCH_ASSOC);

        return $resultat;
    }
}