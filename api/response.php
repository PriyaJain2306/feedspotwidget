<?php
require_once 'db_constant.php';

class Response {
    private $statusCode;
    private $message;
    private $data;

    public function __construct($statusCode = OK, $message = '', $data = []) {
        $this->statusCode = $statusCode;
        $this->message = $message;
        $this->data = $data;
    }

    public function toJson() {
        http_response_code($this->statusCode);
        return json_encode([
            'status' => $this->statusCode == OK ? 'success' : 'error',
            'message' => $this->message,
            'data' => $this->data
        ]);
    }
}
