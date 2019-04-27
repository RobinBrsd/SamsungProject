<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> RBRSD Cinema / Films a l'affiche </title>
        <link rel="stylesheet" href="../assets/css/header.css">
        <link rel="stylesheet" href="../assets/css/res.css">
        <link rel="stylesheet" href="../assets/css/affiche.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    </head>

    <body>
        <?php 
        
            include "header.php";
            include "db_connect.php";
          
            $req = $bdd->prepare("SELECT * from film WHERE date_debut_affiche >= :date");
            
            $req->execute([
                ":date" => '2007-11-19' // set date d'affiche
            ])
        ?>
        
        <ul class=resultat>
            <?php 
                 $i = 0;
                while($res = $req->fetch())
                { ?>
                    
                    <li class="container affiche">
                        <h2> <?php echo $res['titre']?></h2>
                        <img src="../assets/img/affiche.jpg" alt="affichefilm">
                        <p> <?php echo "Du ". $res['date_debut_affiche'] ." - ".$res['date_fin_affiche']; $i++; ?></p>
                    </li>    
          <?php }
               ?> <h3> <?php echo $i ." Films a l'affiche"; ?></h3>
        </ul>


    </body>
</html>
