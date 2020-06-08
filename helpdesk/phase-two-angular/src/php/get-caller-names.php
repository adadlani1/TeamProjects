<?php
	require_once "connect-with-token-authentication.php";
	
    $sql = 'SELECT DISTINCT name FROM employee ORDER BY name';
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['name'];
	}

	echo json_encode($rows);
?>