<?php
class Fruit{
    public $name;
    public $color;
    function _construct($name){
        $this->name=$name;

    }
    function get_name(){
        return $this->name();

    }
}
$apple=new Fruit("Apple");
echo $appe->get_name();
?>