<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'Base_queries.php';
require_once 'Response.php';

try {
    $db = new Database();
    $categories = $db->select('categories');

    echo (new Response(OK, 'Categories fetched successfully', $categories))->toJson();
} catch (Exception $e) {
    echo (new Response(SERVER_ERROR, $e->getMessage()))->toJson();
}
