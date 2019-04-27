<?php 

include "db_connect.php";

if(isset($_POST['film']) && isset($_POST['avis']))
{
    $filmId = $_POST['film'];
    $avis = $_POST['avis'];
    
    $req = $bdd->prepare("UPDATE historique_membre SET avis = :avis WHERE historique_membre.id_film = :filmId");
    $req->execute([
        ":avis" => $avis,
        ":filmId" => $filmId
    ]);
    
    header('Location: search.php');
}

else
{
?> <h1> <?php echo "error/n"; ?> </h1>
   <h2> <?php echo "redirecting in 10 secondes";?> </h2>
    <?php    
    header('Refresh: 10;url=search.php');
    exit;
}


?>