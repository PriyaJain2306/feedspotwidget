<?php
// Handle CORS
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

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once 'Base_queries.php'; // your DB handler class

// Read JSON body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id']) || empty($data['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Widget ID is required'
    ]);
    exit;
}

// Prepare update values
$updateData = [
    'widget_name' => $data['widget_name'] ?? '',
    'feed_url' => $data['feed_url'] ?? '',
    'category_name' => $data['category_name'] ?? '',
    'view' => $data['view'] , // Default to 'list' if not provided
    'settings' => json_encode($data['settings'] ?? []), // Store settings as JSON string
];

// DB update
try {
    $db = new Database();
    $result = $db->update('widgets', $updateData, ['id' => $data['id']]);

    echo json_encode([
        'success' => $result,
        'message' => $result ? 'Widget updated successfully' : 'Update failed'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
