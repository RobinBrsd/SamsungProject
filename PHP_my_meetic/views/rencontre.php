<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title> Welcome to Meetoo </title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />
        <link rel="stylesheet" href="assets/css/rencontre.css">
        <script src="assets/js/jquery-3.3.1.js"></script>
    </head>
    <body>
    <header>
        <div>
            <h1><a href="#"> MeeToo </a></h1>
            <img src = "assets/img/favicon.ico">
        </div>
        <a class="member" href="?page=logout"><i class="fas fa-sign-out-alt"></i> Logout </a>
        <a class="member" href="?page=member"><i class="fas fa-user"></i> Welcome <?php echo $_SESSION['prenom'] ?></a>
    </header>

    <div class="container">
    <h2> Search : </h2>
        <form id="search" action = "" method="POST">
            <label for="age"> Age : </label>
            <input type="number" name="age" min="18" max="100">

            <label id="sexe" for="sexe"> Sexe : </label>
            <div class="sexe-box">
                <label for="homme"> <i id="a" class="fas fa-mars"></i> Homme </label>
                <input type="radio" name="sexe" value="Homme" id="homme" required>

                <label for="femme"> <i id="b" class="fas fa-venus"> </i> Femme </label>
                <input type="radio" name="sexe" value="Femme" id="feminin" required>
            </div>

            <label for="city"> City : </label>
            <input type="text" name="city">
        </form>
    </div>

    </body>