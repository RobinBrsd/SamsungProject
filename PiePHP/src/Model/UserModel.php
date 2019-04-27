<?php

class UserModel extends Entity {

    public $bdd;
    static $relations = [];

    public function __construct($params){
        $this->bdd = new PDO('mysql:host=localhost;dbname=PiePHP;charset=utf8', 'root', '');
        $params['id'] = NULL;
        parent::__construct("users", $params);
    }

    public function indexAction(){
        echo "Model Index Action <br/>";
    }

    public function save(){
        $bdd = $this->bdd;

        $insert = $bdd->prepare("INSERT INTO users(email, password) VALUES(:email, :password);");
        $insert->execute([
            ":email" => $this->email,
            ":password" => $this->password,
        ]);
    }

    public function setValues($tab){
        $value = implode(',', $tab);
        $tab = explode(",", $value);
        $res = [];
        foreach($tab as $val){
            $val = '"'.$val.'"';
            array_push($res, $val);
        }
        $val = implode(",", $res);
        return $val;
    }

    public function create ($fields){
        $bdd = $this->bdd;
        $key = implode(',', array_flip($fields));
        $val = $this->setValues($fields);
        $req = $bdd->prepare("INSERT INTO users($key) VALUES($val);");
        $req->execute();
        return $bdd->lastInsertId(); 
    }

    public function read($id){
        $bdd = $this->bdd;
        $req = $bdd->query("SELECT * FROM users WHERE id = $id");
        $resultat = $req->fetchAll(PDO::FETCH_ASSOC);
        return $resultat; 
    }

    public function update($id, $fields){
        $bdd = $this->bdd;
        $str = "";
        $i = 1;
        foreach($fields as $key => $val){
            if($i == sizeof($fields))
                $str .= $key . " = '" .$val."'";
            else
                $str .= $key . " = '" .$val."', ";
            $i++;
        }
        $req = $bdd->prepare("UPDATE users SET $str WHERE id = $id");
        $req->execute();
        return $req->execute();
    }

    public function delete($id){
        $bdd = $this->bdd;
        $req = $bdd->prepare("DELETE FROM users WHERE id = $id");
        $req->execute();
        return $req->execute();
    }

    public function read_all() {
        $bdd = $this->bdd;
        $req = $bdd->query("SELECT * FROM users");
        $resultat = $req->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }
}