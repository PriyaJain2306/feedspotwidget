<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'rss_widgets');
define('IS_HTTPS', (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443);

// HTTP Status Codes
define('OK', 200);
define('CREATED', 201);
define('BAD_REQUEST', 400);
define('UNAUTHORIZED', 401);
define('FORBIDDEN', 403);
define('NOT_FOUND', 404);
define('INTERNAL_ERROR', 500);
?>