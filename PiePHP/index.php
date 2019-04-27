<?php 

if($_SERVER['REQUEST_URI'] == "/Project/PiePHP/"){ ?>
    <pre> <?php var_dump($_POST); ?></pre>
    <pre> <?php var_dump($_GET); ?></pre>
    <pre> <?php var_dump($_SERVER); ?></pre>
<?php }

define('BASE_URL', str_replace('\\', '/', substr(__DIR__,strlen($_SERVER['DOCUMENT_ROOT']))));
require_once(implode(DIRECTORY_SEPARATOR, ['Core', 'autoload.php']));

$app = new Core\Core();
$app->run();

?>