<?php
    require_once "connect-with-token-authentication.php";

    // _POST array is empty if input is in JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $username = $_POST['username'];

    $query = "SELECT issue.problem_id, description, note, priority
              FROM latest_assignment
              JOIN issue ON latest_assignment.problem_id = issue.problem_id
              JOIN issue_note ON issue.problem_id = issue_note.problem_id
              WHERE latest_assignment.username = '$username'
              AND status = 'referred'
              ORDER BY priority, issue.problem_id";

    $result = $conn->query($query);

    $conn->close();

    $rows = array();
	$i = -1;
	while($row = $result->fetch_assoc()) {
        $problem_id = $row['problem_id'];
        $description = $row['description'];
        $priority = $row['priority'];
        $note = $row['note'];

		// If entry for this issue has not been made, make one. Else remain on current entry (same problem ID)
		if ( ($i < 0) || ($problem_id != $rows[$i]['problem_id']) ) {
			$i++;	// Go to next entry
            $rows[$i]['problem_id'] = $problem_id;
            $rows[$i]['description'] = $description;
            $rows[$i]['priority'] = $priority;
			$rows[$i]['notes'] = array();
		}

		// Append note to 'notes' array for that specific issue
		$rows[$i]["notes"][] = $note;
    }

    echo json_encode($rows);
?>
