<?php
    require_once "connect-with-token-authentication.php";
    
    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $caller_name = $_POST['caller_name'];
	
    $sql = "SELECT name, job_title, telephone, extension_no, department, emp_id
            FROM employee
            WHERE name = '$caller_name'";

	$result = $conn->query($sql);
	
    $conn->close();
    
	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
?>