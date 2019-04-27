<?php 

/**
 * Load everything 
 */
function autoloader($class) 
{
    $class = str_replace("\\", "/", $class);
    $dirs = array(
        '',
        'src/Controller/',
        'src/Model/',
    );

    foreach ($dirs as $dir) {
        if ($dir === '') {
            $files = scandir(__DIR__);
            foreach ($files as $file) {
                if ($file == "." || $file == "..") { 
                    CONTINUE;
                } else {
                    include_once $file;
                }
            }
        }
        if (file_exists($dir.$class . '.php')) {
            include_once $dir.$class . '.php';
        }
    }
    include_once './routes.php';
}
spl_autoload_register('autoloader');
