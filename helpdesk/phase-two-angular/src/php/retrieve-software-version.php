<?php
    require_once "connect-with-token-authentication.php";

    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $softwareName = $_POST['softwareName'];

    $sql = "SELECT DISTINCT version, id
    FROM software 
    WHERE name = '$softwareName'
    ORDER BY version";
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
?>