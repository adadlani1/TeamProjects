<?php
    require_once "connect-with-token-authentication.php";
    
    $sql = 'SELECT DISTINCT device_type FROM hardware ORDER BY device_type';
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['device_type'];
	}

	echo json_encode($rows);
?>