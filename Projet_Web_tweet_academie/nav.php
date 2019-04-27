<!-- FORM NAME TO GET POST VALUE //

FORM SEARCH NAV INFOS :

Rechercher == search


FORM DM INFOS :

Message == messageContent

FORN NEW DN INFOS :

Destinataire == receiver,
Message == messageContent

-->
    <head>
        <link rel="stylesheet" href="css/nav.css">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
    </head>       
       <!-- Navbar Section -->
        <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="main.php"><i class="fas fa-home"></i> Home </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="far fa-bell"></i> Notifications </a>
                    </li>
                    <li class="nav-item">
                        <a data-toggle="modal" data-target="#messages" class="nav-link"><i class="far fa-envelope"></i> Messages </a>
                    </li> 
                </ul>
                <img id="logo-nav" src="img/logo-57x57.png" alt="logo">

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <form class="form-inline" method="POST" action="#">
                            <div class="border">
                                <input class="form-control" type="search" name="search" id="input-nav" placeholder="Rechercher">
                                <button class="btn btn-outline-secondary" id="btn-nav" type="submit"><i class="fas fa-search"></i></button>
                            </div>
                        </form>
                    </li>
                    <li class="nav-item" id="pp-nav">
                        <img class="rounded-circle" src="img/default-users.png" alt="users">
                        <ul class="param">
                            <li class="nav-item"> 
                                <a class="text-secondary" href="#"> Name </a> 
                            </li>
                            <li class="nav-item"> 
                                <a class="text-secondary" href="#"> @Pseudo </a> 
                            </li>
                            <hr/>
                            <li class="nav-item"> 
                                <a class="text-secondary" href="profil.php"> <i class="fas fa-user"></i> Profil </a> 
                            </li>
                            <li class="nav-item"> 
                                <a id="themes" class="text-secondary"><i class="fas fa-sync"></i> Themes </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Form search mobile -->
        <nav id="fixed-search" class="navbar fixed-top navbar-light bg-light">
            <form class="form-inline" method="POST" action="#">
                <div class="border-bottom">
                    <input class="form-control" type="search" id="input-bottom" name="search" placeholder="Rechercher">
                    <button class="btn btn-outline-secondary" id="btn-bottom" type="submit"><i class="fas fa-search"></i></button>
                </div>
            </form>
        </nav>

        <!-- MESSAGE MODALS -->
        <div class="modal fade" id="messages" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Privates Messages </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"> &times; </span>
                        </button>
                    </div>
                    <div class="modal-body"> 
                        <div class="dm" data-toggle="modal" data-target="#messages-details"> 
                            <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                            <p> DM 1 </p> 
                        </div>

                        <div class="dm" data-toggle="modal" data-target="#messages-details"> 
                            <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                            <p> DM 2 </p> 
                        </div>

                        <div class="dm" data-toggle="modal" data-target="#messages-details"> 
                            <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                            <p> DM 3 </p> 
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#new-msg" id="new-msg-btn"> Nouveaux Message <i class="far fa-comment"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PRIVATE DETAILS MESSAGE MODALS -->
        <div class="modal fade" id="messages-details" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                        <h5 class="modal-title"> Usernames Discussion </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"> &times; </span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="chat">
                            <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                            <p> Some text </p>
                        </div>
                        
                        <div class="my-chat">
                            <p> Some text </p>
                        </div>

                        <div class="chat">
                            <img class="rounded-circle" src="img/default-users.png" alt="dm-pp">
                            <p> Some text </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <form class="form-inline col-md-12" id="send-form" method="POST" action="#">
                            <textarea name="messageContent" maxlength="140" class="form-contro col-md-12" type="text" placeholder="Your Message ..."></textarea>
                            <input class="btn col-md-12 btn-send" type="button" value="Send">
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEW MESSAGE MODALS -->
        <div class="modal fade" id="new-msg" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Nouveaux Message </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"> &times; </span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="form-inline" method="POST" action="#">
                            <div class="input-group col-md-12">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> @ </div>
                                </div>
                                <input name="receiver" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary input-group-text" type="submit"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <form class="form-inline col-md-12" id="send-form" method="POST" action="#">
                            <textarea name="messageContent" maxlength="140" class="form-contro col-md-12" type="text" placeholder="Your Message ..."></textarea>
                            <button class="btn col-md-12 btn-send" type="submit"> Send </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="js/nav.js"></script>