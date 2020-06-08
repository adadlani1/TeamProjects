<?php
    require_once "connect.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $username = $_POST['username'];

    $query = "SELECT notification, time, problem_id
            FROM notification
            WHERE username = '$username'
            ORDER BY time";

	$result = $conn->query($query);

    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
?>
