<?php

include "connect-with-token-authentication.php";

$queryToGetMostReferredSpecialists = "SELECT employee.name,assignment.username,COUNT(assignment.problem_id) AS 'Number of times referred' FROM assignment INNER JOIN user ON assignment.username = user.username INNER JOIN employee ON user.emp_id = employee.emp_id GROUP BY username";

$MostReferredSpecialists =$conn->query($queryToGetMostReferredSpecialists);

$conn->close();

$MostReferredSpecialistsArray = array();
while($row = $MostReferredSpecialists->fetch_assoc()) {
    $MostReferredSpecialistsArray[] = $row;
}

echo json_encode($MostReferredSpecialistsArray);
?>
