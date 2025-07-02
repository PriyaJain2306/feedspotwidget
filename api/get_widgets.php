<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'Base_queries.php'; // assumes $db = new Database()

$db = new Database();
$widgets = $db->select('widgets'); // customize based on your table structure
echo json_encode($widgets);
