<?php
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";
    
    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $problem_id = $_POST['problem_id'];

	// Get data on existing issues from a pre-defined view 
    $issue_data_query = "SELECT * FROM existing_issue
                         WHERE problem_id = $problem_id";

    // Get all notes for that issue
    $issue_notes_query = "SELECT note, time_created
                          FROM issue_note
                          WHERE problem_id = $problem_id
                          ORDER BY time_created";

    try {
        $issue_result = RunQuery($issue_data_query);
        $notes_result = RunQuery($issue_notes_query);
        
        if ($issue_result->num_rows == 0) {
            throw new InvalidArgumentException("No matching issue data found for problem id: $problem_id");
        }
        
        // Extract notes and store them in an array
        $notes = array();
        while ($row = $notes_result->fetch_assoc()) {
            $notes[] = $row;
        }
        
        // Extract issue data and append notes array to issue data
        $row = $issue_result->fetch_assoc();
        $row['notes'] = $notes;

        echo json_encode($row);
    } catch (Exception $e) {
        HandleExceptionAndEndScript($e);
    }
    
    $conn->close();
?>