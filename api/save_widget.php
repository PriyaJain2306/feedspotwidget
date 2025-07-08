<?php
// 🔐 Allow CORS for your React app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Important: respond OK
    exit(); // Important: stop script here for preflight
}
require_once 'Response.php'; // Response class for consistent API response
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

// ✅ Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Now your POST logic begins
require_once 'Base_queries.php';
require_once 'Response.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['widget_name']) || !isset($data['settings'])) {
    echo (new Response(BAD_REQUEST, 'Invalid input'))->toJson();
    exit;
}

$db = new Database();
$db->insert('widgets', [
    'widget_name' => $data['widget_name'],
    'feed_url' => $data['feed_url'],
    'category_name' => $data['category_name'],
    'userid' => $data['userid'],
    'username' => $data['username'],
    'view' => $data['view'] , // Default to 'list' if not provided
    'settings' => json_encode($data['settings']),
    'created_at' => date('Y-m-d H:i:s')
]);

echo (new Response(OK, 'Widget saved successfully'))->toJson();
