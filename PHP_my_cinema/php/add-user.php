<?php 

include "db_connect.php";

$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$date = $_POST['date'];
$email = $_POST['email'];
$password = $_POST['password'];

// verif 
$hashpass = password_hash($password, PASSWORD_DEFAULT);
$res = $bdd->query("SELECT count(*) FROM users WHERE email = '$email'"); 
$emailused = $res->fetch();

if(filter_var($email, FILTER_VALIDATE_EMAIL) && $emailused[0] < 1) 
{
    $req = $bdd->prepare("INSERT INTO users (nom, prenom, date, email, password) VALUES(:nom, :prenom, :date, :email, :password);");

    $req->execute([
        ":nom" => "$nom",
        ":prenom" => $prenom,
        ":date" => $date,
        ":email" => $email,
        ":password" => $hashpass
    ]);

    echo "Inscription valider\n";
    header('Refresh: 2;url=login.php');
    exit;
}

else
{
    
?> <h1> <?php echo "email not viable or already used\n"; ?> </h1>
   <h2> <?php echo "redirecting in 10 secondes";?> </h2>
    <?php    
    header('Refresh: 10;url=inscription.php');
    exit;
}

?>
