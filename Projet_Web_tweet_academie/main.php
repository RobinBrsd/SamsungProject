<!-- 

    FORM TWEETER INFOS : 

    Contenu du tweet == tweetContent,

-->

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title> WAC Twitter -> Time Line </title>
        <meta name="description" content="Fil d'actualiter">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="img/favicon.ico">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/tweet_style.css">
        <script src="js/jquery-3.3.1.js"></script> 
    </head>
    <body>
        <?php include("nav.php"); ?>

        <!-- Main Content Section -->
        <div class="container" id="main-container">
            <div class="row">
                <div class="col-md-3" id="card-right">
                    <img id="big-pic" class="rounded-circle" src="img/default-users.png" alt="users">
                    <div class="profil-card-name">
                        <p><b> Name </b></p>
                        <p class="text-secondary"> @Pseudo </p>
                    </div>
                    <div class="profil-card-infos">
                        <div class="stats-box">
                            <p class="infos-title"> Tweets </p>
                            <p> 55 </p>
                        </div>
                        <div class="stats-box">
                            <p class="infos-title"> Follow </p>
                            <p> 75 </p>
                        </div>
                        <div class="stats-box">
                            <p class="infos-title"> Followers </p>
                            <p> 95 </p>
                        </div>
                    </div>
                </div>
                <div id="tweet" class="col-lg-6 col-md-12 col-sm-12">
                    <form class="form-inline" method="POST" action="#">
                        <textarea name="tweetContent" id="tweet-box" maxlength="140" placeholder="Quoi de neuf ?"></textarea>
                        <button class="btn btn-outline-secondary" id="btn-tweet" type="submit"> Tweeter </button>
                    </form>

                    <div class="all-tweets">
                        <div class="header-tweet">
                            <p> Tweets </p>
                        </div>
                        <div class="tweet-style">
                            <div class="tweet-users">
                                <img class="rounded-circle" src="img/default-users.png" alt="users">
                                <p> Name </p>
                                <p class="text-secondary"> @pseudo - Date</p>
                            </div>
                            <div class="tweet-contents">
                                <p> Hello moi ces Robin, ceci et mon premier tweet sur ceux site, ces super cool trop mega cool </p>
                            </div>
                            <div class="tweet-btn">
                                <a class="text-secondary"><i class="fas fa-comment-alt"></i></a>
                                <a class="text-secondary"><i class="fas fa-retweet"></i></a>
                                <a class="text-secondary"><i class="fas fa-heart"></i></a>
                            </div>
                        </div>

                        <div class="tweet-style">
                            <div class="tweet-users">
                                <img class="rounded-circle" src="img/default-users.png" alt="users">
                                <p> Name </p>
                                <p class="text-secondary"> @pseudo - Date</p>
                            </div>
                            <div class="tweet-contents">
                                <p> Hello moi ces Robin, ceci et mon premier tweet sur ceux site, ces super cool trop mega cool </p>
                                <img class="img-fluid" src="img/template-400x400.jpg" alt="tweet-img">
                            </div>
                            <div class="tweet-btn">
                                <a class="text-secondary"><i class="fas fa-comment-alt"></i></a>
                                <a class="text-secondary"><i class="fas fa-retweet"></i></a>
                                <a class="text-secondary"><i class="fas fa-heart"></i></a>
                            </div>
                        </div>

                        <div class="tweet-style">
                            <div class="tweet-users">
                                <img class="rounded-circle" src="img/default-users.png" alt="users">
                                <p> Name </p>
                                <p class="text-secondary"> @pseudo - Date</p>
                            </div>
                            <div class="tweet-contents">
                                <p> Hello moi ces Robin, ceci et mon premier tweet sur ceux site, ces super cool trop mega cool </p>
                            </div>
                            <div class="tweet-btn">
                                <a class="text-secondary"><i class="fas fa-comment-alt"></i></a>
                                <a class="text-secondary"><i class="fas fa-retweet"></i></a>
                                <a class="text-secondary"><i class="fas fa-heart"></i></a>
                            </div>
                        </div>

                        <div class="tweet-style">
                            <div class="tweet-users">
                                <img class="rounded-circle" src="img/default-users.png" alt="users">
                                <p> Name </p>
                                <p class="text-secondary"> @pseudo - Date</p>
                            </div>
                            <div class="tweet-contents">
                                <p> Hello moi ces Robin, ceci et mon premier tweet sur ceux site, ces super cool trop mega cool </p>
                            </div>
                            <div class="tweet-btn">
                                <a class="text-secondary"><i class="fas fa-comment-alt"></i></a>
                                <a class="text-secondary"><i class="fas fa-retweet"></i></a>
                                <a class="text-secondary"><i class="fas fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="copyright" class="col-md-3">
                    <p class="text-secondary"> Wac Twitter &copy 2019 </p>
                    <a href="#" class="text-secondary"> Conditions </a>
                    <a href="#" class="text-secondary"> Politique de confidentialité </a>
                    <a href="#" class="text-secondary"> Cookies </a>
                    <a href="#" class="text-secondary"> Informations sur la publicité </a>
                    <a href="#" class="text-secondary"> Marque </a>
                    <a href="#" class="text-secondary"> Blog </a>
                    <a href="#" class="text-secondary"> État du service </a>
                    <a href="#" class="text-secondary"> Applications </a>
                    <a href="#" class="text-secondary"> Offres d'emploi </a>
                    <a href="#" class="text-secondary"> Marketing </a>
                    <a href="#" class="text-secondary"> Professionnels </a>
                    <a href="#" class="text-secondary"> Développeurs </a>
                </div>
            </div>
        </div>
    </body>
</html>