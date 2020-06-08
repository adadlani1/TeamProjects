<?php
	require_once "connect-with-token-authentication.php";
	
	$hardware_sql = 'SELECT device_type, make, model, serial 
					 FROM hardware
					 ORDER BY device_type, make, model';
    $software_sql = 'SELECT name, version
					 FROM software
					 ORDER BY name';
	$hardware_result = $conn->query($hardware_sql);
	$software_result = $conn->query($software_sql);

    $conn->close();

	// Convert results into php arrays
	$hardware_rows = array();
	$i = -1;
	$j = -1;
	$k = -1;
    while($row = $hardware_result->fetch_assoc()) {
		$device_type = $row['device_type'];
		$make = $row['make'];
		$model = $row['model'];
		$serial = $row['serial'];

		// If entry for this device type has not been made, make one. Else remain on current device_type entry (same device type)
		if ( ($i < 0) || ($device_type != $hardware_rows[$i]['device_type']) ) {
			$i++;	// Go to next device_type entry
			$hardware_rows[$i]['device_type'] = $device_type;
			$hardware_rows[$i]['makes'] = [];
			$j = -1;	// Reset as new entry has no makes initially
		}

		// If entry for this make has not been made, make one. Else remain on current make entry.
		if ( ($j < 0) || ($make != $hardware_rows[$i]['makes'][$j]['make']) ) {
			$j++;	// Go to next makes entry
			$hardware_rows[$i]['makes'][$j]['make'] = $make;
			$hardware_rows[$i]['makes'][$j]['models'] = [];
			$k = -1;	// Reset as new entry has no models initially
		}

		// If entry for this model has not been made, make one. Else remain on current model entry.
		if ( ($k < 0) || ($model != $hardware_rows[$i]['makes'][$j]['models'][$k]['model']) ) {	
			$k++;	// Go to next model entry
			$hardware_rows[$i]['makes'][$j]['models'][$k]['model'] = $model;
			$hardware_rows[$i]['makes'][$j]['models'][$k]['serials'] = [];
		}

		// Append serial to list of serials for current device type, make, model combination.
		$hardware_rows[$i]['makes'][$j]['models'][$k]['serials'][] = $serial;
	}
	

	$software_rows = array();
	$i = -1;
	while($row = $software_result->fetch_assoc()) {
		$name = $row['name'];
		$version = $row['version'];
		
		// If entry for this software name has not been made, make one. Else remain on current entry (same software name)
		if ( ($i < 0) || ($name != $software_rows[$i]['name']) ) {
			$i++;	// Go to next entry
			$software_rows[$i]['name'] = $name;
			$software_rows[$i]['versions'] = array();
		}

		// Append version to 'versions' array for that specific software name
		if ($version != NULL)
			$software_rows[$i]["versions"][] = $version;
	}

	
	$rows = array('hardware' => $hardware_rows, 'software' => $software_rows);

	echo json_encode($rows);
?>