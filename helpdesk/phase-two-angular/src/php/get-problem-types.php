<?php
	require_once "connect-with-token-authentication.php";
	
    $sql = 'SELECT DISTINCT type FROM problem_type ORDER BY type';
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['type'];
	}

	echo json_encode($rows);
?>