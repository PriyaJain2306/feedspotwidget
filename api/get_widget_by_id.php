<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'Base_queries.php';

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
