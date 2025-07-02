<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'Base_queries.php';

$id = $_POST['id'];
$db = new Database();
$result = $db->delete('widgets', ['id' => $id]);

echo json_encode(['success' => $result]);
