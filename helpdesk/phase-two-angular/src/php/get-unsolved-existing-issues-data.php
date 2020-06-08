<?php
	require_once "connect-with-token-authentication.php";
    
	// Get data on existing issues from a pre-defined view 
    $query = "SELECT * FROM existing_issue
              WHERE NOT status = 'solved'";
	$result = $conn->query($query);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
?>