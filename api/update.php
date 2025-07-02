<?php
// Handle CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // or "*"
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


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
