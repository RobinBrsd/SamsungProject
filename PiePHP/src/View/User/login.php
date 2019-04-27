<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title> Login Form </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <form action="../../../index.php" method="POST">
            <h1> Login Form </h1>
            <br/>
            <label for="email"> Email : </label>
            <input id="email" type="email" name="email"/>
            <br/>
            <label for="password"> Password : </label>
            <input id="password" type="password" name="password" /> 
            <br/>
            <Button type="submit"> Login </Button>
        </form>
    </body>
</html>