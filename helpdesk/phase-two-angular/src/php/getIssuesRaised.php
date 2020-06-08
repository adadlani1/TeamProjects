<?php
 include "connect-with-token-authentication.php";
//this query gets all the issues along with their time of creation
 $queryToGetIssuesRaised = "SELECT issue.problem_id, MIN(issue_note.time_created) AS 'Time Created' FROM `issue_note` INNER JOIN issue ON issue.problem_id = issue_note.problem_id GROUP BY problem_id";
 $GetIssuesRaised = $conn->query($queryToGetIssuesRaised);
 $conn->close();
 
 //stores the result in an array
 $issuesArray = array();
 while($row = $GetIssuesRaised->fetch_assoc()){
  $issuesArray[] = $row;
 }

// and echoes out the json object of that array
echo json_encode($issuesArray);
?>
