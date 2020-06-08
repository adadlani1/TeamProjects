<?php
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $specialist = $_POST['specialist'];
    $problem_id = $_POST['problem_id'];
    $priority = $_POST['priority'];
    $time_now = time();

    try {
        refer_specialist($specialist, $problem_id, $time_now, $priority);
    } catch (Exception $e) {
        HandleExceptionAndEndScript($e);
    }
?>