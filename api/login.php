<?php
// Disable PHP errors in response
error_reporting(0);
ini_set('display_errors', 0);

// CORS and JSON headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once 'db_constant.php';  // DB connection config
require_once 'jwt_util.php';     // JWT functions

// Get incoming JSON
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing username or password']);
    exit;
}

// Connect to database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Query user by username
$stmt = $conn->prepare("SELECT id, username, password FROM db_login WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
$conn->close();

if ($user && password_verify($password, $user['password'])) {
    $payload = [
        'id' => $user['id'],
        'username' => $user['username'],
        'exp' => time() + 3600 // Token expires in 1 hour
    ];

    $jwt = generate_jwt($payload);

    echo json_encode([
        'success' => true,
        'token' => $jwt,
        'db_login' => [
            'id' => $user['id'],
            'username' => $user['username']
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
