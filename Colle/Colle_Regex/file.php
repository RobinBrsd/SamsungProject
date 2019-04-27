<?php 

$html = file_get_contents("cmd.html");
$json = json_encode($html);

var_dump($json);

$files = 'files.json';

fopen($files, "w");
fwrite('files.json', $json);

?>