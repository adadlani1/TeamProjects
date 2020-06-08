<?php 
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);
    
    $problem_id = $_POST['problem_id'];
    $solution = isset($_POST['solution']) ? $_POST['solution'] : null;
    $parent_issue_id = isset($_POST['parent_issue_id']) ? $_POST['parent_issue_id'] : null;
    $solution_id = isset($_POST['solution_id']) ? $_POST['solution_id'] : null;
    
    try {
        provide_solution($problem_id, $solution, $parent_issue_id, $solution_id);
    } catch (Exception $e) {
        HandleExceptionAndEndScript($e);
    }
?>