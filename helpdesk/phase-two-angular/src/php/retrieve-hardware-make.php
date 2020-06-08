<?php
    require_once "connect-with-token-authentication.php";

    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $hardwareName = $_POST['hardwareName'];

    $sql = "SELECT DISTINCT make 
            FROM hardware 
            WHERE device_type = '$hardwareName'
            ORDER BY make";
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['make'];
	}

	echo json_encode($rows);
?>