<?php 

$bdd = new PDO('mysql:host=localhost;dbname=todo_list;charset=utf8', 'root', '');

$req = $bdd->query("SELECT * FROM todo");

while($data = $req->fetch())
{
    echo "Name = ". $data['name'] . " infos = " .$data['infos'] ."<br/>";
}

?>