<?php

require_once "connect-with-token-authentication.php";

$rest_json_input = file_get_contents("php://input");
$_POST = json_decode($rest_json_input, true);

$specialist_tasks = array();
$all_specialists = array();

$get_all_specialists = "SELECT username FROM specialist";
$all_specialists_result = $conn->query($get_all_specialists);

//get all specialists data in order to generate graphs for all of them.
while($row = $all_specialists_result->fetch_assoc()) {
  $all_specialists[] = $row['username'];
}

$i=0;
//query the solved tasks, the pending tasks and referred tasks for each specialist.
foreach ($all_specialists as $username) {
	$get_solved_tasks_query = "SELECT latest_assignment.problem_id, issue.status
							FROM latest_assignment
							JOIN issue ON latest_assignment.problem_id = issue.problem_id
							WHERE latest_assignment.username = '$username' AND issue.status = 'solved'";

	$get_current_assignments_query = "SELECT latest_assignment.problem_id, issue.status
									FROM latest_assignment
									JOIN issue ON latest_assignment.problem_id = issue.problem_id
									WHERE latest_assignment.username = '$username'
									AND issue.status = 'referred'";

	$get_assignments_that_have_been_referred_on =
								"SELECT problem_id
								FROM assignment
								WHERE username='$username'
								AND problem_id NOT IN (SELECT problem_id FROM latest_assignment WHERE username='$username')";

	$solved_tasks_result = $conn->query($get_solved_tasks_query);
	$currently_assigned_tasks_result = $conn->query($get_current_assignments_query);
	$referred_tasks_result = $conn->query($get_assignments_that_have_been_referred_on);

  //store the result in an array	
	$solved_tasks = array();
	while($row = $solved_tasks_result->fetch_assoc()) {
		$solved_tasks[] = $row;
	}
	
  //similar things is done for the rest
	$current_assignments = array();
	while($row = $currently_assigned_tasks_result->fetch_assoc()){
		$current_assignments[] = $row;
	}
	
	$referred_on_tasks = array();
	while($row = $referred_tasks_result->fetch_assoc()){
		$referred_on_tasks[] = $row;
	}
	
	$specialist_task_info = array(
		'username' => $username,
		'currently_assigned' => sizeof($current_assignments),
		'solved' => sizeof($solved_tasks),
		'referred' => sizeof($referred_on_tasks)
	);
	
	$specialist_tasks[$i] = $specialist_task_info;
	$i= $i +1;
}

$conn->close();

//echo out the json of the data
echo json_encode($specialist_tasks);

?>
