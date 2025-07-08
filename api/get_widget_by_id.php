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
require_once 'Response.php'; // Response class for consistent API response
require_once 'jwt_util.php'; // JWT validation


$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing ID']);
    exit;
}

try {
    $db = new Database();
    $widget = $db->select('widgets', ['id' => $id]);

    if ($widget && count($widget) > 0) {
        echo json_encode([
            'success' => true,
            'data' => $widget[0]  // Assuming `select` returns an array of rows
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Widget not found'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
