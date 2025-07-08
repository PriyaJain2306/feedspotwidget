<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once 'jwt_util.php';

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    echo json_encode(['success' => false, 'message' => 'Missing or invalid token']);
    exit;
}

$token = substr($authHeader, 7);
$payload = validate_jwt($token);

if (!$payload) {
    echo json_encode(['success' => false, 'message' => 'Token is invalid or expired']);
    exit;
}

// Protected content
echo json_encode(['success' => true, 'message' => 'Access granted', 'user' => $payload]);
