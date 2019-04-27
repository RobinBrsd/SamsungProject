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
        <link rel="stylesheet" href="assets/css/home.css">
        <script src="assets/js/jquery-3.3.1.js"></script>
    </head>
    <body>
        <header>
            <div>
                <h1><a href="#"> MeeToo </a></h1>
                <img src = "assets/img/favicon.ico">
            </div>
            <button id="connect"> Se connecter </button>
        </header>

        <main>
            <div id="welcome">
                <h2 class="open"> Je m'inscris maintenant </h2>
                <i class="fas fa-chevron-circle-down open"></i>
            </div>
            <form id="main_form" method="POST" class="hidden">
                <div class="container">
                    <h2> Je m'inscris maintenant </h2> 
                    <label for="nom"> Nom : </label>
                    <input type="text" name="nom" id="nom" required>
                    <label for="prenom"> Prenom : </label>
                    <input type="text" name="prenom" id="prenom" required>
                    <div class="sexe">
                        <p> Sexe : </p>
                        <div>
                            <label for="homme"> <i id="a" class="fas fa-mars"></i> Homme </label>
                            <input type="radio" name="sexe" value="Homme" id="homme" required>
                        </div>
                        <div>
                            <label for="femme"> <i id="b" class="fas fa-venus"> </i> Femme </label>
                            <input type="radio" name="sexe" value="Femme" id="feminin" required>
                        </div>
                    </div>
                    <label for="date"> Date de naissance : </label>
                    <input type="date" name="date" id="date" required>
                    <label for="city"> Main City : </label>
                    <input type="text" name="city" id="city" required>
                    <label for="email"> @mail : </label>
                    <input type="email" name="email" id="email" required>
                    <label for="password"> Password : </label>
                    <input type="password" name="password" id="password" required>
                    <button type="submit" class="button"> Creer ton profil </button>
                </div>
            </form>
            
            <form id=connection action="" method="POST" class="hidden">
                <div class="container">
                    <h2> Je me connecte </h2> 
                    <label for="email"> @mail : </label>
                    <input type="email" name="email" id="email" required>
                    <label for="password"> Password : </label>
                    <input type="password" name="password" id="password" required>
                    <button type="submit" class="button"> Connection </button>
                </div>
                <p class="open" id="inscrit"> Pas de compte ? inscrit toi ! </p>
            </form>

        </main>
        <script src="assets/js/home.js"></script>
    </body>
</html>