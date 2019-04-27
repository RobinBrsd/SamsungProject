<?php

use Controller\Controller;

class UserController extends Controller {

    public $method;

    public function indexAction() {
        echo "Default Action <br/>";
    }

    public function addAction(){
        echo "add Action ! ";    
    }

    public function registerAction() {
        if(sizeof($_POST) > 1) {
            $params = $this->request->getQueryParams();
            $user = new UserModel($params);
            if(!$user->id) {
                $user->save();
                self::$_render = "Votre compte a ete cree." . PHP_EOL;
            }
        }
        else {
            $this->render('register');
            return;
        }
    }
}