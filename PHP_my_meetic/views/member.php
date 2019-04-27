<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title> Welcome to Meetoo </title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />
        <link rel="stylesheet" href="assets/css/member.css">
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
        <main>
            <div class="container">
                <h2>Infos Personnel </h2>
                <?php $infos->infos() ?>

                <h2></h2>
                <form method="POST" action="?page=update">
                    <h3> Modifier email : </h3>
                    <input type="email" name="email" placeholder="New email" required>
                    <button type="submit"> Valider </button>
                </form>

                <form method="POST" action="?page=update">
                    <h3> Modifier Password : </h3>
                    <input type="password" name="passOld" placeholder="Old Password" required>
                    <input type="password" name="password" placeholder="New Password" required>
                    <input type="password" name="passConfirm" placeholder="Confirm Password" required>
                    <button type="submit"> Valider </button>
                </form>

                <a href="?page=delete"> Supprimer mon compte </a>
            </div>
        </main>
    </body>
</html>