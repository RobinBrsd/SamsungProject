<?php 

var_dump($_POST);

$bdd = new PDO('mysql:host=localhost;dbname=todo_list;charset=utf8', 'root', '');

$taskName = $_POST['name'];
$taskInfos = $_POST['infos'];

$req = $bdd->prepare("INSERT INTO todo (name, infos) VALUES(:name, :infos);");

$req->execute([
    ":name" => $taskName,
    ":infos" => $taskInfos
]);

?>