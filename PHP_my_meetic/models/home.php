<?php 

class home
{
    protected $nom;
    protected $prenom;
    protected $sexe;
    protected $date;
    protected $city;
    protected $email;
    protected $password;
    protected $bdd;

    public function __construct($POST = [])
    {
        $this->bdd = new PDO('mysql:host=localhost;dbname=My_Meetic_Users;charset=utf8', 'root', '');

        if(!empty($POST))    
            $this->hydrate($POST);
    }

    public function hydrate($data)
    {
        foreach ($data as $key => $value)
        {
            $function = "set" .ucfirst($key);

            if (is_callable(array($this, $function)))
            {
                $this->$function($value);
            }
        }
    }

    public function setNom($nom)
    {
        $this->nom = ucfirst($nom);
    }

    public function setPrenom($prenom)
    {
        $this->prenom = ucfirst($prenom);
    }

    public function setSexe($sexe)
    {
        $this->sexe = ucfirst($sexe);
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function setcity($city)
    {
        $this->city = ucfirst($city);
    }

    public function setEmail($email)
    {
        if(filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            $this->email = $email;
        }
        else
        {
            $this->email = false;
        }
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function login()
    {
        $email = $this->email;
        $password = $this->password;
        $bdd = $this->bdd;

        $req = $bdd->query("SELECT * FROM users WHERE email = '$email'"); 
        $infos = $req->fetch();

        $hash = $infos['password'];
        $statut = $infos['statut'];
        
        if($infos['email'] == $email)
        {
            if($statut == "Actif")
            {
                if(password_verify($password, $hash))
                {
                    session_start();
                        
                    $_SESSION['nom'] = $infos['nom'];
                    $_SESSION['prenom'] = $infos['prenom'];
                    $_SESSION['sexe'] = $infos['sexe'];
                    $_SESSION['date'] = $infos['date'];
                    $_SESSION['city'] = $infos['city'];
                    $_SESSION['email'] = $infos['email'];
                    $_SESSION['password'] = $infos['password'];
                    
                    header("Location: ?page=rencontre");
                }
                else
                {
                    echo "Password invalide";
                }
            }
            else
            {
                echo "Account inactif";
            }
        }
        else
        {
            echo "Email invalide";
        }
    }

    public function inscription()
    {
        $nom = $this->nom;
        $prenom = $this->prenom;
        $sexe = $this->sexe;
        $date = $this->date;
        $city = $this->city;
        $email = $this->email;
        $password = $this->password;
        $bdd = $this->bdd;

        $req = $bdd->query("SELECT count(*) FROM users WHERE email = '$email'"); 
        $emailused = $req->fetch();

        $hashpass = password_hash($password, PASSWORD_BCRYPT);

        if(filter_var($email, FILTER_VALIDATE_EMAIL) && $emailused[0] < 1) 
        {
            $insert = $bdd->prepare("INSERT INTO users(nom, prenom, sexe, date, city, email, password, statut) VALUES(:nom, :prenom, :sexe, :date, :city, :email, :password, :statut);");
            $insert->execute([
                ":nom" => $nom,
                ":prenom" => $prenom,
                ":sexe" => $sexe,
                ":date" => $date,
                ":city" => $city,
                ":email" => $email,
                ":password" => $hashpass,
                ":statut" => "Actif"
            ]);

            echo "Inscription valider";
            header('Refresh: 2;url=');
            exit;
        }
        else
        {
            echo "error";
        }
    }

    public function getNom()
    {
        return $this->nom;
    }
}

if(!empty($_POST))
{
    $call = new home($_POST);
    if(!empty($call->getNom()))
        $call->inscription();
    else {
        $call->login();
    }
}

?>