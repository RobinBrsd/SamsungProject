<?php 

include "db_connect.php";

if(isset($_POST['email']))
{
    $email = $_POST['email'];
    $password = $_POST['password'];
        
    $res = $bdd->query("SELECT * FROM users WHERE email = '$email'"); 
    $infos = $res->fetch();
    $hash = $infos['password'];
    
    if(password_verify($password , $hash))
    {
        session_start();
        
        $_SESSION['nom'] = $infos['nom'];
        $_SESSION['prenom'] = $infos['prenom'];
        $_SESSION['email'] = $infos['email'];
        $_SESSION['date'] = $infos['date'];
        
        header("Location: ../index.php");
    }
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Login </title>
    <link rel="stylesheet" href="../assets/css/header.css">
    <link rel="stylesheet" href="../assets/css/login.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>

<body>
    <?php include "header.php" ?>
    <?php
    if(isset($_POST['email']))
    {
        if(password_verify($password , $hash) == false)
        {
            echo "email or password invalid";
        }
    }
    ?>
    <form id="login-form" action="login.php" method="POST">
        <h2> Login </h2>
        <input type="text" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required><br/>
        <button type="submit" name="submit"> Login </button>
    </form>
    <a id="inscription" href="inscription.php"> No account yet ? Sign up !</a>
</body>
</html>
