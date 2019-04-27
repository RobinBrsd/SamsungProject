<!-- FORM NAME TO GET POST VALUE //

FORM LOGIN :

Email address = Email-Login,
Password = Password-Login,
Remember me = auto-login


FORM INSCRIPTION :

@Pseudo = Pseudo,
BirthDate = BirthDate,
Email Address = Email-Inscription,
Password-Inscription = Password-Inscription

-->

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title> WAC Twitter -> Home </title>
        <meta name="description" content="Twitter wac">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="img/favicon.ico">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <link rel="stylesheet" href="css/home.css">
        <script src="js/jquery-3.3.1.js"></script> 
    </head>
    <body>
    <div class="container">
      <form class="form text-center" id="login" method="POST" action="#">
        <img class="logo" src="img/logo.png" alt="logo-WacTwitter">
        <h3> Please Sign-In </h3>
        <div class="text-left">
            <label for="Email-Login"> Email address </label>
            <input type="email" id="Email-Login"  name="Email-Login" class="form-control" placeholder="Email address" required autofocus>
            
            <label for="Password-Login"> Password </label>
            <input type="password" id="Password-Login" name="Password-Login" class="form-control" placeholder="Password" required>
            
            <div class="checkbox-container">
                <input type="checkbox" id="auto-login" name="auto-login" checked>
                <label for="auto-login"> Remember me </label>
            </div>
            
            <a class="text-secondary" id="Sign-up-link"> No Account ? Sign-Up ! </a>
            <button class="btn btn-lg btn-primary" type="submit">Sign in</button>
        </div>
      </form>

      <form class="form text-center hidden" id="inscription" method="POST" action="#">
        <img class="logo" src="img/logo.png" alt="logo-WacTwitter">
        <h3> Please Sign-Up </h3>
        <div class="text-left">
            <label for="Pseudo-Inscription"> @Pseudo </label>
            <input type="text" id="Pseudo-Inscription" name="Pseudo" class="form-control" placeholder="@JohnDoe" required>

            <label for="Date-Inscription"> Birthdate </label>
            <input type="date" id="Date-Inscription" name="Birthdate" class="form-control" required>
            
            <label for="Email-Inscription"> Email address </label>
            <input type="email" id="Email-Inscription" name="Email-Inscription" class="form-control" placeholder="Email address" required>
            
            <label class="password-label" for="Password-Inscription"> Password </label>
            <input type="password" id="Password-Inscription" name="Password-Inscription" class="form-control" placeholder="Password" required>
            
            <a class="text-secondary" id="Sign-in-link"> Already got account ? Sign-In ! </a>
            <button class="btn btn-lg btn-primary" type="submit"> Sign Up </button>
        </div>
      </form>
    </div>
        <script src="js/home.js"></script>
    </body>
</html>