<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> RBRSD Cinema </title>
        <link rel="stylesheet" href="../assets/css/header.css">
        <link rel="stylesheet" href="../assets/css/res.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    </head>

<body>
    <?php include "header.php"; ?>
    <div class="resultat">
        <h1> User Infos </h1>
        <p> Name : <?php echo $_SESSION['nom'];?> </p>
        <p> FirstName : <?php echo $_SESSION['prenom'];?> </p>
        <p> Email Address : <?php echo $_SESSION['email'];?> </p>
        <p> Date of birth : <?php echo $_SESSION['date'];?> </p>
        <div id="logout">
            <a href="logout.php"> Logout </a>
            <i id="nav__logo-one" class="fas fa-sign-out-alt"></i>
        </div>
    </div>
</body>
</html>
