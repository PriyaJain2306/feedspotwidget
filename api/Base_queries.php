
<?php
require_once 'db_constant.php';

class Database {
    private $conn;

    public function __construct() {
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    // INSERT
    public function insert($table, $data) {
        $columns = '';
        $placeholders = '';
        $values = [];
        $types = '';

        foreach ($data as $column => $value) {
            $columns .= $column . ', ';
            $placeholders .= '?, ';
            $values[] = $value;
            $types .= $this->getType($value);
        }

        $columns = rtrim($columns, ', ');
        $placeholders = rtrim($placeholders, ', ');

        $sql = "INSERT INTO " . $table . " (" . $columns . ") VALUES (" . $placeholders . ")";
        return $this->runQuery($sql, $types, $values);
    }

    // UPDATE
    public function update($table, $data, $where) {
        $set = '';
        $values = [];
        $types = '';

        foreach ($data as $column => $value) {
            $set .= $column . " = ?, ";
            $values[] = $value;
            $types .= $this->getType($value);
        }

        $set = rtrim($set, ', ');

        $whereClause = '';
        foreach ($where as $column => $value) {
            $whereClause .= $column . " = ? AND ";
            $values[] = $value;
            $types .= $this->getType($value);
        }

        $whereClause = rtrim($whereClause, ' AND ');

        $sql = "UPDATE " . $table . " SET " . $set . " WHERE " . $whereClause;
        return $this->runQuery($sql, $types, $values);
    }

    // DELETE
    public function delete($table, $where) {
        $whereClause = '';
        $values = [];
        $types = '';

        foreach ($where as $column => $value) {
            $whereClause .= $column . " = ? AND ";
            $values[] = $value;
            $types .= $this->getType($value);
        }

        $whereClause = rtrim($whereClause, ' AND ');

        $sql = "DELETE FROM " . $table . " WHERE " . $whereClause;
        return $this->runQuery($sql, $types, $values);
    }

    // SELECT
    public function select($table, $where = [], $columns = '*') {
        $whereClause = '';
        $values = [];
        $types = '';

        if (!empty($where)) {
            $whereClause = " WHERE ";
            foreach ($where as $column => $value) {
                $whereClause .= $column . " = ? AND ";
                $values[] = $value;
                $types .= $this->getType($value);
            }
            $whereClause = rtrim($whereClause, ' AND ');
        }

        $sql = "SELECT " . $columns . " FROM " . $table . $whereClause;
        $stmt = $this->prepareQuery($sql, $types, $values);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
    }

    // Reusable execution method
    private function runQuery($sql, $types, $values) {
        $stmt = $this->prepareQuery($sql, $types, $values);
        return $stmt->execute();
    }

    // Prepares and binds
    private function prepareQuery($sql, $types, $values) {
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            die("Prepare failed: " . $this->conn->error);
        }

        if (!empty($types)) {
            $stmt->bind_param($types, ...$values);
        }

        return $stmt;
    }

    // Get type for bind_param
    private function getType($var) {
        return match (gettype($var)) {
            'integer' => 'i',
            'double' => 'd',
            default => 's',
        };
    }

    public function getLastInsertId() {
        return $this->conn->insert_id;
    }

    public function __destruct() {
        $this->conn->close();
    }
}
?>
