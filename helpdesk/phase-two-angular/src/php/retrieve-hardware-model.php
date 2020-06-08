<?php
    require_once "connect-with-token-authentication.php";

    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $hardwareName = $_POST['hardwareName'];
    $make = $_POST['make'];

    $sql = "SELECT DISTINCT model 
            FROM hardware 
            WHERE device_type = '$hardwareName' AND make = '$make'
            ORDER BY model";
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['model'];
	}

	echo json_encode($rows);
?>