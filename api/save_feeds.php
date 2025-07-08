<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Important: respond OK
    exit(); // Important: stop script here for preflight
}

include 'db.php';
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

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

if (isset($data->title) && isset($data->link)) {
    $title = $conn->real_escape_string($data->title);
    $link = $conn->real_escape_string($data->link);
    $image_url = isset($data->image_url) ? $conn->real_escape_string($data->image_url) : "";

    $sql = "INSERT INTO feeds (title, link, image_url) VALUES ('$title', '$link', '$image_url')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing title or link"]);
}

$conn->close();
?>
