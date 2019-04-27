<?php

include "db_connect.php";

$reqGenre = $bdd->query('SELECT nom FROM genre');
$reqDistrib = $bdd->query('SELECT nom FROM distrib');

if(isset($_POST['search']))
{ ?>
    <form id="autoSub" type="submit" action="res-member.php" method="POST">
        <input type="hidden" name = "search" value="<?php echo $_POST['search'] ?>">
    </form>

    <script type="text/javascript">
        document.getElementById('autoSub').submit();
    </script>
<?php }  ?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> RBRSD Cinema / Search Member </title>
        <link rel="stylesheet" href="../assets/css/search.css">
        <link rel="stylesheet" href="../assets/css/header.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    </head>
    
    <body>
        <?php include "header.php"; ?>
        
        <form id="idform" action="res-member.php" method="POST">
            <div id="search-bg">
                <input id="input" class="invisible" type="text" name="search" placeholder="John Doe">
                <label for="input"><i class="fas fa-search"></i></label>
            </div>
            <div class="btn__container">
                <input id="submit" class="invisible" type="submit" value="Submit">
            </div>
        </form>
        <script src="../assets/js/script.js"></script>
    </body>
</html>
