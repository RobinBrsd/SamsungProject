<?php 

namespace Router;

class Router
{

    public static $routes;

    public static function connect($url, $route)
    {
        self::$routes[$url] = $route;
    }

    public static function get($url)
    {
        $tab = explode("/", $url);
        $url = $tab[sizeof($tab) - 2] ."/". $tab[sizeof($tab) - 1];
        $tab = explode("/", $url);

        return $tab;
    }

    public static function getStatic($url)
    {
        if (isset(self::$routes[$url])) {
            return self::$routes[$url];
        } else {
            return false;
        }
    }

    public static function error($model, $action)
    {
        $dirs = array(
            'src/Controller/',
            'src/Model/',
            '',
        );

        foreach ($dirs as $dir) {
            if ($model == "PiePHP") {
                if (file_exists($dir.$action . 'Controller.php')) {
                    return true;
                } elseif ($action == "") {
                    return true;
                }
            } elseif (file_exists($dir.$model . 'Controller.php')) {
                if ($action != "") {
                    $action = $action . "Action";
                    $var = $model . "Controller";
                    $class = new $var;
                    if (method_exists($class, $action)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            } 
            else {
                return false;
            }
        }
    }
}