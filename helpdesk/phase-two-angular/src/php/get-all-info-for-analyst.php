<?php
include "connect-with-token-authentication.php";

//this query gets all the specialists username which is then queried.
$queryToGetAllSpecialistsName = "SELECT user.username,employee.name FROM user INNER JOIN employee ON user.emp_id = employee.emp_id WHERE user.role = 'specialist'";
//this query is used to get all the problem types, and their
//count mainly for hardware, software and network related problems
$queryToGetNumberOfProblemTypes = "SELECT problem_type,COUNT(problem_type) AS 'Number of issues' FROM issue GROUP BY problem_type";
//this query gets the specialists name as well the
//number of times they have been referred to, 
//including referrals made by other specialists
$queryToGetMostReferredSpecialists = "SELECT employee.name,assignment.username,COUNT(assignment.problem_id) AS 'Number of times referred' FROM assignment INNER JOIN user ON assignment.username = user.username INNER JOIN employee ON user.emp_id = employee.emp_id GROUP BY username";
//this query gets the calls handled per operator
$queryToGetCallsPerOperator = "SELECT employee.name,COUNT(calls.operator_id) AS 'Number of calls' FROM calls INNER JOIN employee ON calls.operator_id = employee.emp_id GROUP BY calls.operator_id";
//this query gets the issue raised along with their time of creation
$queryToGetIssuesRaised = "SELECT issue.problem_id,MIN(issue_note.time_created) AS 'Time Created' FROM `issue_note` INNER JOIN issue ON issue.problem_id = issue_note.problem_id GROUP BY problem_id";

$AllSpecialistsName = $conn->query($queryToGetAllSpecialistsName);
$NumberOfProblemTypes = $conn->query($queryToGetNumberOfProblemTypes);
$MostReferredSpecialists =$conn->query($queryToGetMostReferredSpecialists);
$GetCallsPerOperator = $conn->query($queryToGetCallsPerOperator);
$GetIssuesRaised = $conn->query($queryToGetIssuesRaised);

$conn->close();

//store each result of the queries in an array
$specialistsArray = array();
while($row = $AllSpecialistsName->fetch_assoc()) {
    $specialistsArray[] = $row;
}

$problemTypesArray = array();
while($row = $NumberOfProblemTypes->fetch_assoc()) {
  $problemTypesArray[] = $row;
}

$MostReferredSpecialistsArray = array();
while($row = $MostReferredSpecialists->fetch_assoc()) {
    $MostReferredSpecialistsArray[] = $row;
}

$callsPerOperatorArray = array();
while($row = $GetCallsPerOperator->fetch_assoc()) {
  $callsPerOperatorArray[] = $row;
}

$issuesArray = array();
while($row = $GetIssuesRaised->fetch_assoc()){
  $issuesArray[] = $row;
}

//store each of the arrays in a final array and echo out a single json object
$informationToAnalysts = array();
$informationToAnalysts['specialistsDetails'] = $specialistsArray;
$informationToAnalysts['mostCommonProblems'] = $problemTypesArray;
$informationToAnalysts['mostReferredSpecialists'] = $MostReferredSpecialistsArray;
$informationToAnalysts['callsPerOperator'] = $callsPerOperatorArray;
$informationToAnalysts['issues'] = $issuesArray;

echo json_encode($informationToAnalysts);



?>


