<?php 

class Entity
{
    public function __construct($table, $params) 
    {
        $orm = new ORM();
        $id = $params['id'];
        foreach ($params as $key => $value) {
            $this->$key = $value;
        }

        if ($id != null) {
            $return = $orm->read($table, $id);
            return $return;
        }
    }
}