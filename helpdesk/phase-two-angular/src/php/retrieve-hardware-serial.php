<?php
    require_once "connect-with-token-authentication.php";

    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $hardwareName = $_POST['hardwareName'];
    $make = $_POST['make'];
    $model = $_POST['model'];

    if ( ($model == "") && ($make == "") ) {
        $sql = "SELECT DISTINCT serial 
            FROM hardware 
            WHERE device_type = '$hardwareName'
            ORDER BY serial";
    }
    else if ($model == "" ) {
        $sql = "SELECT DISTINCT serial 
            FROM hardware 
            WHERE device_type = '$hardwareName' AND make = '$make'
            ORDER BY serial";

    } else {
        $sql = "SELECT DISTINCT serial 
            FROM hardware 
            WHERE device_type = '$hardwareName' AND make = '$make' AND model = '$model'
            ORDER BY serial";
    }
    
	$result = $conn->query($sql);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row['serial'];
	}

	echo json_encode($rows);
?>