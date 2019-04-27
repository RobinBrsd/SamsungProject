<?php 

class ArticleModel extends Entity {

    static $relations = 'has many tags';
    public function __construct(){
        
    }
}