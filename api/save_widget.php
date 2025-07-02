<?php
// 🔐 Allow CORS for your React app
header("Access-Control-Allow-Origin: http://localhost:3000"); // or "*"
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

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
    'settings' => json_encode($data['settings']),
    'created_at' => date('Y-m-d H:i:s')
]);

echo (new Response(OK, 'Widget saved successfully'))->toJson();
