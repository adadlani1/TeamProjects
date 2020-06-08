<?php
	require_once "connect-with-token-authentication.php";
	
	function ValidateDatesFilter($dates) {
		// If either start or end date is not specified, then set dates filter to null
		if (!isset($dates['start']) || !isset($dates['end'])) {
			return null;
		}

		// Trim whitespace from start and end dates
		$dates['start'] = trim($dates['start']);
		$dates['end'] = trim($dates['end']);

		// If either start or end date are empty strings after trimming, set dates filter to null
		if (empty($dates['start']) || empty($dates['end'])) {
			return null;
		}

		return $dates;
	}

	$rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

	$filters = array();
	
	if (isset($_POST['filters'])) {
		$filters = $_POST['filters'];
	}
	
	// Trim all filters of whitespace, and then assign empty strings to null
	foreach ($filters as $key => $value) {
		if (is_array($value)) {
			// Only array filter should be the dates filter (with start and end dates as elements)
			$value = ValidateDatesFilter($value);
		} else {
			// $value is a string (i.e. any filter that isn't the dates filter)
			$value = trim($value);
			
			if (empty($value)) {
				$value = null;
			}
		}
		
		$filters[$key] = $value;
	}
	
	$query_conditions_array = array();

	// Build query condtions array with any filters that are applied
	if (isset($filters['caller_name'])) {
		$query_conditions_array[] = "caller_name = '{$filters['caller_name']}'";
	}
	if (isset($filters['problem_id'])) {
		$query_conditions_array[] = "problem_id = '{$filters['problem_id']}'";
	}
	if (isset($filters['problem_type'])) {
		$query_conditions_array[] = "problem_type = '{$filters['problem_type']}'";
	}
	if (isset($filters['specialist_name'])) {
		$query_conditions_array[] = "specialist_name = '{$filters['specialist_name']}'";
	}
	if (isset($filters['status'])) {
		$query_conditions_array[] = "status = '{$filters['status']}'";
	}
	if (isset($filters['username'])) {
		$query_conditions_array[] = "operator_username = '{$filters['username']}'";
	}
	if (isset($filters['dates'])) {
		// Dates should be in UNIX time stamp format
		$start_date = $filters['dates']['start'];
		$end_date = $filters['dates']['end'];
		$query_conditions_array[] = "time_created BETWEEN FROM_UNIXTIME($start_date) AND FROM_UNIXTIME($end_date)";
	}
	
	// Create the conditions string to be put in the query
	$query_conditions = implode(' AND ', $query_conditions_array);

	// If no filters applied, set condition to return all entries
	if (empty($query_conditions)) {
		$query_conditions = "1=1";
	}

	// Get data on existing issues from a pre-defined view 
	$query = "SELECT * FROM existing_issue WHERE $query_conditions";
	$result = $conn->query($query);
	
    $conn->close();

	// Convert result into a php array
	$rows = array();
    while($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
?>