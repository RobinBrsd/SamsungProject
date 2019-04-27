<?php

session_start();

class member
{
    public function infos()
    {
        echo "<p> <span> Nom </span> : " .$_SESSION['nom'] ."</p>";
        echo "<p> <span> Prenom </span> : " .$_SESSION['prenom'] ."</p>";
        echo "<p> <span> Sexe </span> : " .$_SESSION['sexe'] ."</p>";
        echo "<p> <span> Date de naissance </span> : " .$_SESSION['date'] ."</p>";
        echo "<p> <span> City </span> : " .$_SESSION['city'] ."</p>";
        echo "<p> <span> Email </span> : " .$_SESSION['email'] ."</p>";
        echo "<p> <span> Password </span> : " .$_SESSION['password'] ."</p>";
    }
}

$infos = new member();

?>