<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'Base_queries.php';
require_once 'Response.php';

if (!isset($_GET['category'])) {
    echo (new Response(BAD_REQUEST, 'Category not specified'))->toJson();
    exit;
}

$category = $_GET['category'];

try {
    $db = new Database();
    $feeds = $db->select('db_feeds', ['category' => $category]);

    // Sort feeds by most recent
    usort($feeds, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));

    echo (new Response(OK, 'Feeds fetched successfully', $feeds))->toJson();
} catch (Exception $e) {
    echo (new Response(SERVER_ERROR, $e->getMessage()))->toJson();
}
