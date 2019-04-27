<?php 

session_start();

$email = $_SESSION['email'];

$req = $bdd->query("SELECT * FROM users WHERE email = '$email'"); 
$infos = $req->fetch();

$statut = $infos['statut'];

if($statut == "Actif")
{
    $req = $bdd->prepare("UPDATE users SET statut = 'Inactif' WHERE email = '$email'");
    $req->execute();

    session_destroy();
    header('Location: ?page=home');
}
else
{
    echo "Account Already Inactif/n";
}


?>