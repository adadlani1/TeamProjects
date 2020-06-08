<?php
require_once "connect-with-token-authentication.php";

$rest_json_input = file_get_contents("php://input");
$_POST = json_decode($rest_json_input, true);

$specialist_tasks = array();

foreach ($_POST['usernames'] as $username) {
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

	
	$solved_tasks = array();
	while($row = $solved_tasks_result->fetch_assoc()) {
		$solved_tasks[] = $row;
	}
	
	$current_assignments = array();
	while($row = $currently_assigned_tasks_result->fetch_assoc()){
		$current_assignments[] = $row;
	}
	
	$referred_on_tasks = array();
	while($row = $referred_tasks_result->fetch_assoc()){
		$referred_on_tasks[] = $row;
	}
	
	$specialist_task_info = array(
		'currently_assigned' => $current_assignments,
		'solved' => $solved_tasks,
		'referred' => $referred_on_tasks
	);
	
	$specialist_tasks[$username] = $specialist_task_info;
}

$conn->close();
echo json_encode($specialist_tasks);
?>
