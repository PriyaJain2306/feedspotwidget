<?php
// CORS and JSON headers
// Allow from any origin

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Important: respond OK
    exit(); // Important: stop script here for preflight
}
// Required files
require_once 'Base_queries.php';
require_once 'Response.php';

// Extract JWT token from Authorization header


// Check for category
if (!isset($_GET['category'])) {
    echo (new Response(BAD_REQUEST, 'Category not specified'))->toJson();
    exit;
}

$category = $_GET['category'];

try {
    $db = new Database();
    $feeds = $db->select('db_feeds', ['category' => $category]);

    // Sort by latest
    usort($feeds, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));

    echo (new Response(OK, 'Feeds fetched successfully', $feeds))->toJson();
} catch (Exception $e) {
    echo (new Response(SERVER_ERROR, $e->getMessage()))->toJson();
}
