<?php
    require_once "connect-with-token-authentication.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $year = $_POST['year'];

    // Get all issues created in the specified year
    $query = "SELECT MONTH(time_created) AS month_created, COUNT(*) AS count
              FROM existing_issue
              WHERE year(time_created) = '$year'
              GROUP BY month_created
              ORDER BY month_created";
    
    $result = $conn->query($query);

    // Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

    $conn->close();
	echo json_encode($rows);
?>