<?php
require_once 'Base_queries.php'; // adjust path as needed

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

// Basic validation
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit;
}

$username = trim($data['username']);
$password = trim($data['password']);

if (strlen($username) < 3 || strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Username must be at least 3 characters and password 6 characters']);
    exit;
}

$db = new Database();

// Check if user already exists
$existingUser = $db->select('db_login', ['username' => $username]);
if (!empty($existingUser)) {
    echo json_encode(['success' => false, 'message' => 'Username already exists']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert into database
$inserted = $db->insert('db_login', [
    'username' => $username,
    'password' => $hashedPassword
]);

if ($inserted) {
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Signup failed']);
}
