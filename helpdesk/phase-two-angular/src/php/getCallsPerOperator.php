<?php
  include "connect-with-token-authentication.php";

  $queryToGetCallsPerOperator = "SELECT employee.name,COUNT(calls.operator_id) AS 'Number of calls' FROM calls INNER JOIN employee ON calls.operator_id = employee.emp_id GROUP BY calls.operator_id";

  $GetCallsPerOperator = $conn->query($queryToGetCallsPerOperator);

  $conn->close();

  $callsPerOperatorArray = array();

  while($row = $GetCallsPerOperator->fetch_assoc()) {
  $callsPerOperatorArray[] = $row;
  }

  echo json_encode($callsPerOperatorArray);

?>
