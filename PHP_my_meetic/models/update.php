<?php 

session_start();
$email = $_SESSION['email'];

if(isset($_POST['email']))
{
    $newEmail = $_POST['email'];
    
    $req = $bdd->prepare("UPDATE users SET email = '$newEmail' WHERE email = '$email'");
    $req->execute();

    $_SESSION['email'] = $newEmail;
    header('Location: ?page=member');
}

elseif(isset($_POST['password']))
{
    $passOld = $_POST['passOld'];
    $PassConfirm = $_POST['passConfirm'];
    $password = $_POST['password'];

    $req = $bdd->query("SELECT * FROM users WHERE email = '$email'");
    $DB = $req->fetch();

    $hash = $DB['password'];

    if(password_verify($passOld, $hash))
    {
        if($PassConfirm == $password)
        {
            $newHash = password_hash($password, PASSWORD_BCRYPT);

            $req = $bdd->prepare("UPDATE users SET users.password = '$newHash' WHERE email = '$email'");
            $req->execute();

            $_SESSION['password'] = $newHash;
            header('Location: ?page=member');
        }
        else
        {
            echo "Password doesn't match"."</br>";
            echo "Redirect in 5s";
            header('Refresh: 5;url= ?page=member'); 
        }
    }
    else
    {
        echo "Password Invalide" ."</br>"; 
        echo "Redirect in 5s";
        header('Refresh: 5;url= ?page=member');
    }
}

else
{
    header('Location: ?page=home');
}


?>