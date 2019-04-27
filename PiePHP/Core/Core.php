<?php 

namespace Core;

use Router\Router;
use AppController\AppController;

class Core extends Router
{
    public $model;
    public $action;

    public function run() 
    {
        $url = $_SERVER['REQUEST_URI'];
        $tab = $this->get($url);
        
        if (Router::getStatic($url)) {
            $tab = Router::getStatic($url);
            $method = $tab['controller'].'Controller';
            $action = $tab['action'].'Action';

            $var = new $method;
            $var->$action();
        } else {
            $this->model = $tab[0];
            $this->action = $tab[1];
            
            $check = $this->error($this->model, $this->action);

            if ($check === true) {
                $this->callController($this->model, $this->action);
            } else {
                include_once 'src/View/Error/404.php';
                return;
            }
            echo __CLASS__ . " [OK]" . PHP_EOL;
        }
    }

    public function callController($model, $action)
    {
        if ($model != "PiePHP") {
            $controller = $model . "Controller";
            $var = new $controller;
            if ($model != "") {
                if ($action != "") {
                    $action = $action . "Action";
                    $var->$action();
                } else {
                    $var->indexAction();
                }
            }
        } elseif ($model == "PiePHP" && $action != "") {
            $controller = $action . "Controller";
            $var = new $controller;
            $var->indexAction();
        } else {
            $app = new AppController();
            $app->indexAction();
        }
    }
}