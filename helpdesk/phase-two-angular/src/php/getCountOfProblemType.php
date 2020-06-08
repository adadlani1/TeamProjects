<?php

include "connect-with-token-authentication.php";

$queryToGetNumberOfProblemTypes = "SELECT problem_type,COUNT(problem_type) AS 'Number of issues' FROM issue GROUP BY problem_type";

$NumberOfProblemTypes = $conn->query($queryToGetNumberOfProblemTypes);

$conn->close();

$problemTypesArray = array();
while($row = $NumberOfProblemTypes->fetch_assoc()) {
  $problemTypesArray[] = $row;
}


echo json_encode($problemTypesArray);

?>
