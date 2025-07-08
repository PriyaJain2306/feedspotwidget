<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Important: respond OK
    exit(); // Important: stop script here for preflight
}

require_once 'Base_queries.php';
require_once 'Response.php';
// Response class for consistent API response
require_once 'jwt_util.php'; // JWT validation

// Extract JWT token from Authorization header
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    echo (new Response(UNAUTHORIZED, 'Authorization token missing'))->toJson();
    exit;
}

$token = $matches[1];

// Validate JWT
$payload = validate_jwt($token);
if (!$payload || !isset($payload['id'])) {
    echo (new Response(UNAUTHORIZED, 'Invalid or expired token'))->toJson();
    exit;
}

try {
    $db = new Database();
    $categories = $db->select('categories');

    echo (new Response(OK, 'Categories fetched successfully', $categories))->toJson();
} catch (Exception $e) {
    echo (new Response(SERVER_ERROR, $e->getMessage()))->toJson();
}
