<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

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
