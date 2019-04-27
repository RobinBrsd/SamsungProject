<?php

include "db_connect.php";

$search = $_POST['search'];
$distrib = $_POST['distrib'];
$genre = $_POST['genre'];

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
                if(isset($search) && isset($distrib) && isset($genre))
                {                
                    if($distrib == "Tout les distributeurs" && $genre == "Tout les genres")
                    {
                        $req = $bdd->prepare('SELECT titre, id_film, resum, genre.nom AS nameGenres FROM genre, film WHERE titre LIKE :search AND genre.id_genre = film.id_genre ORDER BY case when titre like :order then 0 else 1 end, titre');
                        $req->execute([
                            ":search" => "%$search%",
                            ":order" => "$search%"
                        ]);
                    }
                    elseif($distrib != "Tout les distributeurs" && $genre != "Tout les genres")
                    {
                        $req = $bdd->prepare('SELECT titre, id_film, resum, genre.nom AS nameGenres FROM film, distrib, genre WHERE titre LIKE :search AND distrib.nom = :distrib AND genre.nom = :genre AND distrib.id_distrib = film.id_distrib AND genre.id_genre = film.id_genre ORDER BY case when titre like :order then 0 else 1 end, titre');
                        $req->execute([
                            ":search" => "%$search%",
                            ":order" => "$search%",
                            ":distrib" => $distrib,
                            ":genre" => $genre,
                        ]);

                    }
                    elseif($distrib != "Tout les distributeurs")
                    {
                        $req = $bdd->prepare('SELECT titre, id_film, resum, distrib.nom, genre.nom AS nameGenres FROM film, distrib, genre WHERE titre LIKE :search AND distrib.nom = :distrib AND distrib.id_distrib = film.id_distrib ORDER BY case when titre like :order then 0 else 1 end, titre');
                        $req->execute([
                            ":search" => "%$search%",
                            ":order" => "$search%",
                            ":distrib" => $distrib
                        ]);
                    }
                    elseif($genre != "Tout les genres")
                    {
                        $req = $bdd->prepare('SELECT titre, id_film, resum, genre.nom AS nameGenres FROM film, genre WHERE titre LIKE :search AND genre.nom = :genre AND genre.id_genre = film.id_genre ORDER BY case when titre like :order then 0 else 1 end, titre');
                        $req->execute([
                            ":search" => "%$search%",
                            ":order" => "$search%",
                            ":genre" => $genre
                        ]);
                    }

                    while ($res = $req->fetch())
                    { ?>
                        <li class="container pag">
                            <img src="../assets/img/affiche.jpg" alt="pp">
                            <h2> <?php echo $res['titre'];?></h2>
                            <p class="p"> <?php echo $res['resum']; $i++;  ?></p>
                            <p> <?php echo "Genre : " .$res['nameGenres'];?></p>
                            <form id="avis" action="add-avis.php" method="POST">
                                <input type="text" name="avis" placeholder="Avis sur le film" required>
                                <input type="hidden" name="film" value="<?php echo $res['id_film'] ?>">
                                <button type="submit"> Send </button>
                            </form>
                        </li>
                <?php } ?>
                    <h3><?php echo $genre ." & ". $distrib ." : ". $i ." Match found\n"; ?></h3>
            <?php } ?>
        </ul>
        <div class="bg-back">
            <a href="search.php"><i class="fas fa-arrow-alt-circle-left"></i></a>
        </div>
        <script src="../assets/js/pagination.js"></script>
    </body>
</html>