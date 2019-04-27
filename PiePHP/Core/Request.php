<?php 

class Request
{
    public function __construct() 
    {
        foreach ($_REQUEST as $value) {
            trim($value);
            htmlspecialchars($value);
            stripslashes($value);
        }
    }

    public function getQueryParams() 
    {
        return $_REQUEST;
    }
}