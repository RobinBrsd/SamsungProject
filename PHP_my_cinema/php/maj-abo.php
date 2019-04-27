<?php 

include "db_connect.php";

$abo = intval($_POST['abo']);
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];

$req = $bdd->prepare("UPDATE membre, fiche_personne, abonnement SET membre.id_abo = :abo WHERE fiche_personne.id_perso = membre.id_fiche_perso AND membre.id_abo = abonnement.id_abo AND fiche_personne.nom = :nom AND fiche_personne.prenom = :prenom");

$req->execute([
    ":abo" => $abo, 
    ":nom" => $nom, 
    ":prenom" => $prenom 
]);


?>

<form id="autoSub" type="submit" action="search-member.php" method="POST">
    <input type="hidden" name = "search" value="<?php echo $prenom ." ".$nom ?>">
</form>

<script type="text/javascript">
    document.getElementById('autoSub').submit();
</script>
