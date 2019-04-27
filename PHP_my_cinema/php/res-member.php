<?php

include "db_connect.php";

$search = $_POST['search'];
$x = explode(" ", $search);
$firstname = $x[0];

if(isset($x[1]))
{
    $lastname = $x[1];
}

?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Search Result </title>
        <link rel="stylesheet" href="../assets/css/res.css">
        <link rel="stylesheet" href="../assets/css/header.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <script src="../assets/js/jquery.min.js"></script>
    </head>

    <body>
        <?php include "header.php"; ?>

        <h1 id="res"> Search Result </h1>
        <ul class="resultat">
        <?php
            $i = 0;
            if(isset($_POST))
            {                
                if(isset($lastname))
                {
                    $req = $bdd->prepare("SELECT *, abonnement.duree_abo AS timeabo, fiche_personne.nom AS name, abonnement.nom AS follow FROM fiche_personne, abonnement, membre WHERE abonnement.id_abo = membre.id_abo AND fiche_personne.id_perso = membre.id_fiche_perso AND prenom LIKE :prenom AND fiche_personne.nom LIKE :nom");
                    $req->execute([
                        ":nom" => "%$lastname%",
                        ":prenom" => "%$firstname%"
                    ]);
                }
                
                elseif(isset($firstname))
                {
                    $req = $bdd->prepare("SELECT *, abonnement.duree_abo AS timeabo, fiche_personne.nom AS name, abonnement.nom AS follow FROM fiche_personne, abonnement, membre WHERE abonnement.id_abo = membre.id_abo AND fiche_personne.id_perso = membre.id_fiche_perso AND prenom LIKE :prenom");
                    $req->execute([
                        ":prenom" => "%$firstname%"
                    ]);
                }
                while ($res = $req->fetch())
                { ?>
                    <li class="container box-member pag">
                        <img id="res-pp" src="../assets/img/random.jpg">
                        <p> <?php echo "Lastname : " ?> <span class="infos"> <?php echo $res['name'];?> </span></p>
                        <p> <?php echo "Firstname : " ?> <span class="infos"> <?php echo $res['prenom'];?></span></p>
                        <p> <?php echo "Email : " ?> <span class="infos"> <?php echo $res['email']; ?> </span></p>
                        <p> <?php echo "City : " ?> <span class="infos"> <?php echo $res['ville'] ." | Postal code : ".$res['cpostal'];?> </span></p>
                        <div>
                            <p><?php echo "Abonnement : " ?> <span class="infos"> <?php echo $res['follow'] ." for " .$res['timeabo'] ." Days"; $i++; ?> </span></p> 
                            <form action="maj-abo.php" method="POST">
                                <input type="hidden" name="nom" value="<?php echo $res['name'] ?>"/>
                                <input type="hidden" name="prenom" value="<?php echo $res['prenom'] ?>" />
                                
                                <select name = "abo" size = "1">
                            <?php if($res['follow'] == "VIP")
                                  { ?>
                                    <option value="0"> <?php echo $res['follow'] ?></option>
                                    <option value="1"> GOLD </option>
                                    <option value="2"> Classic </option>
                                    <option value="3"> pass day </option>
                                    <option value="4"> malsch </option>
                            <?php } 
                                  if($res['follow'] == "GOLD")
                                  { ?>
                                    <option value="1"> <?php echo $res['follow'] ?></option>
                                    <option value="0"> VIP </option>
                                    <option value="2"> Classic </option>
                                    <option value="3"> pass day </option>
                                    <option value="4"> malsch </option>
                            <?php } 
                                  if($res['follow'] == "Classic")
                                  { ?>
                                    <option value="2"> <?php echo $res['follow'] ?></option>
                                    <option value="0"> VIP </option>
                                    <option value="1"> GOLD </option>
                                    <option value="3"> pass day </option>
                                    <option value="4"> malsch </option>
                            <?php }
                                  if($res['follow'] == "pass day")
                                  { ?>
                                    <option value="3"> <?php echo $res['follow'] ?></option>
                                    <option value="0"> VIP </option>
                                    <option value="2"> Classic </option>
                                    <option value="1"> GOLD </option>
                                    <option value="4"> malsch </option>
                            <?php }
                                  if($res['follow'] == "malsch")
                                  { ?>
                                    <option value="4"> <?php echo $res['follow'] ?></option>
                                    <option value="0"> VIP </option>
                                    <option value="1"> GOLD </option>
                                    <option value="2"> Classic </option>
                                    <option value="3"> passday </option>
                            <?php } 
                            ?>  
                                </select>
                                <input type="submit" value="Modifier">
                            </form> 
                        </div>
                        <ul>
                        <?php
                            $histo = $bdd->prepare("SELECT titre, fiche_personne.nom FROM film, historique_membre, fiche_personne, membre WHERE fiche_personne.id_perso = membre.id_fiche_perso AND membre.id_membre = historique_membre.id_membre AND film.id_film = historique_membre.id_film AND fiche_personne.nom = :nom AND fiche_personne.prenom = :prenom");
                            $histo->execute([
                                ":prenom" => $res['prenom'],
                                ":nom" => $res['name']
                            ]); ?>
                            <select id="historique" size="1">
                                <option selected> Film visionner </option>
                                <?php 
                                    while($resu = $histo->fetch())
                                    { ?>
                                        <option> <?php echo $resu['titre']; ?></option>
                              <?php } ?>
                            </select>
                        </ul>
                    </li>
          <?php } ?>
                    <h3><?php echo $i ." Match found\n"; ?></h3>
        <?php } ?>
        </ul>
        <div class="bg-back">
            <a href="search-member.php"><i class="fas fa-arrow-alt-circle-left"></i></a>
        </div>
        <script src="../assets/js/pagination.js"></script>
    </body>
</html>