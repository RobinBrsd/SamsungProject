<?php

use Router\Router;

Router::connect('/Project/PiePHP/', ['controller' => 'App', 'action' => 'index']);
Router::connect('/Project/PiePHP/User', ['controller' => 'User', 'action' => 'index']);
Router::connect('/Project/PiePHP/User/add', ['controller' => 'User', 'action' => 'add']);
Router::connect('/Project/PiePHP/User/register', ['controller' => 'User', 'action' => 'register']);
Router::connect('/Project/PiePHP/App', ['controller' => 'App', 'action' => 'index']);
Router::connect('/Project/PiePHP/Theo', ['controller' => 'Theo', 'action' => 'Theo']);

