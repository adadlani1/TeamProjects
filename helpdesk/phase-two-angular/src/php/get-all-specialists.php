<?php
  require_once "connect-with-token-authentication.php";

      // Get data on existing issues from a pre-defined view 
  $sql = 'SELECT name FROM employee WHERE job_title = "specialist"';
      $result = $conn->query($sql);

  $conn->close();

      // Convert result into a php array
  $rows = array();
  while($row = $result->fetch_assoc()) {
              $rows[] = $row;
      }

  echo json_encode($rows);
?>
