<?php

$bdd = new PDO('mysql:host=localhost;dbname=My_Meetic_Users;charset=utf8', 'root', '');

if(isset($_GET['page']) && is_file("../controllers/".$_GET['page'].'.php'))
{
    require("../controllers/".$_GET['page'].".php");
}
else
{
    require('../controllers/home.php');
}

?>