<?php
    try 
    {
        $bdd = new PDO('mysql:host=localhost;dbname=epitech_tp;charset=utf8', 'root', '');
    } 
    catch(Exception $error) 
    {
        die('Erreur : '.$error->getMessage());
    }

?>