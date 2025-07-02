<?php
$widgetId = $_GET['id'] ?? 'unknown';
?>
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 10px; font-family: sans-serif; }
    .widget { background: #f9f9f9; border: 1px solid #ccc; padding: 10px; }
  </style>
</head>
<body>
  <div class="widget">
    <h3>Widget ID: <?php echo htmlspecialchars($widgetId); ?></h3>
    <p>This is the widget content rendered inside an iframe.</p>
  </div>
</body>
</html>
