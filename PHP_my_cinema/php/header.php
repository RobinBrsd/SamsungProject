<?php

$url = $_SERVER['REQUEST_URI'];
$tab = explode("/", $url);
$page = end($tab);
session_start();

?>    

<header>
        <nav>
            <?php
            if($page == "index.php" || $page == "") { ?>
                <h1 id="logo"> <a href="index.php">RBRSD <span> Cinema </span></a></h1>
            <?php }
            else { ?>
                <h1 id="logo"> <a href="../index.php">RBRSD <span> Cinema </span></a></h1>
            <?php } ?>
            
            <ul>
                <?php 
                if($page == "index.php" || $page == "") { 
                    if(isset($_SESSION['email']))
                    { ?>
                    <li><a href="php/user-space.php"> User : <?php echo $_SESSION['prenom'] ?> <i class="fas fa-user"></i></a></li>
              <?php }
                    else
                    { ?>
                    <li><a href="php/login.php"> Login <i id="nav__logo-one" class="fas fa-sign-in-alt"></i></a></li>
              <?php } ?>
                    <li><a href="php/search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li><a href="php/search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li><a href="php/alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php }
                
                if($page == "login.php" || $page == "inscription.php") { ?>
                    <li class="active"><a href="login.php"> Login <i id="nav__logo-one" class="fas fa-sign-in-alt"></i></a></li>
                    <li><a href="search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li><a href="search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li><a href="alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php }

                if($page == "search.php" || $page == "resultat.php") {
                    if(isset($_SESSION['email']))
                    { ?>
                    <li><a href="user-space.php"> User : <?php echo $_SESSION['prenom'] ?> <i class="fas fa-user"></i></a></li>
              <?php }
                    else
                    { ?>
                    <li><a href="login.php"> Login <i id="nav__logo-one" class="fas fa-sign-in-alt"></i></a></li>
              <?php } ?>
                    <li class="active"><a href="search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li><a href="search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li><a href="alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php }

                if($page == "search-member.php" || $page == "res-member.php") {
                    if(isset($_SESSION['email']))
                    { ?>
                    <li><a href="user-space.php"> User : <?php echo $_SESSION['prenom'] ?> <i class="fas fa-user"></i></a></li>
              <?php }
                    else
                    { ?>
                    <li><a href="login.php"> Login <i id="nav__logo-one" class="fas fa-sign-in-alt"></i></a></li>
              <?php } ?>
                    <li><a href="search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li class="active"><a href="search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li><a href="alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php }
                
                if($page == "alaffiche.php") {
                    if(isset($_SESSION['email']))
                    { ?>
                    <li><a href="user-space.php"> User : <?php echo $_SESSION['prenom'] ?> <i class="fas fa-user"></i></a></li>
              <?php }
                    else
                    { ?>
                    <li><a href="login.php"> Login <i id="nav__logo-one" class="fas fa-sign-in-alt"></i></a></li>
              <?php } ?>
                    <li><a href="search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li><a href="search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li class="active"><a href="alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php }
                
                if($page == "user-space.php") { ?>
                    <li class="active"><a href="user-space.php"> User : <?php echo $_SESSION['prenom'] ?> <i class="fas fa-user"></i></a></li>
                    <li><a href="search.php"> Look for a film <i class="fas fa-search"></i></a></li>
                    <li><a href="search-member.php"> Look for a member<i class="fas fa-search"></i></a></li>
                    <li><a href="alaffiche.php"> Films a l'affiche <i class="fas fa-video"></i></a></li>
               <?php } ?>
            </ul>
        </nav>
    </header>