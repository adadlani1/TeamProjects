<?php
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $problem_id = FormatForQuery($_POST['problem_id']);
    $note = FormatForQuery($_POST['note']);
    
    // Get data on existing issues from a pre-defined view 
    $query = "INSERT INTO issue_note (problem_id, note)
              VALUES ($problem_id, $note)";

    try {
        $result = RunQuery($query);
    } catch (Exception $e) {
        HandleExceptionAndEndScript($e);
    }

    $conn->close();
?>