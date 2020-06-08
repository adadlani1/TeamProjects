<?php
    require_once "connect.php"; // Required to get access to database connection $conn
    require_once "contact-functions.php";

    // Add an extra apostrophe (single quote) character to any occurence of an apostrophe
    // so that MySQL correctly interprets it as an apostrophe rather than as a 
    // beginning/end of a string value in a query.
    function AddEscapeCharsToApostrophes($value) {
        if (is_string($value))
            return str_replace("'", "''", $value);
        else
            return $value;
    }

    // Set null values to "NULL", otherwise escape apostrophe characters in value
    function FormatForQuery($value) {
        $value = trim($value); // Trim surrounding whitespace
        $value = trim($value, "'"); // Trim surrounding single quote marks
        
        if (empty($value)) {
            return "NULL";
        } else {
            $value = AddEscapeCharsToApostrophes($value);
            $formatted_value = "'$value'";
            return $formatted_value;
        }
    }
    
    function RunInsertQueryAndReturnGeneratedID($query) {
        RunQuery($query);
        return GetGeneratedIDAfterInsert();
    }
    
    // Gets last auto-generated ID from running an insert query
    function GetGeneratedIDAfterInsert() {
        global $conn;   // Use pre-defined connection from connect.php

        $get_id_query = "SELECT LAST_INSERT_ID()";
        $result = $conn->query($get_id_query);

        $row = $result->fetch_assoc();
        $id = $row['LAST_INSERT_ID()'];

        return $id;
    }

    // Attempts to run insert query. If it fails, then ends script with an error
    function RunQuery($query) {
        global $conn; // Use pre-defined connection from connect.php

        $result = $conn->query($query);

        if (!$result) {
            $error = $conn->error;
            throw new exception($error);
        }

        return $result;
    }

    function HandleExceptionAndEndScript($exception) {
        if ($exception instanceof InvalidArgumentException) {
            http_response_code(400); // Bad request
        } else {
            http_response_code(500); // Internal server error
        }
        
        die("Error: " . $exception->getMessage());
    }

    function GetUserEmail($username) {
        $user_details = GetUserEmployeeDetails($username);
        return $user_details['email'];
    }

    function GetNameFromUsername($username) {
        $user_details = GetUserEmployeeDetails($username);
        return $user_details['name'];
    }

    function GetUserEmployeeDetails($username) {
        $username = FormatForQuery($username);
        $query = "SELECT *
                  FROM employee JOIN user
                  ON employee.emp_id = user.emp_id
                  WHERE user.username = $username";

        $result = RunQuery($query);

        if ($result->num_rows == 0) {
            throw new InvalidArgumentException("No employee entry found for username: $username");
        }

        $entry = $result->fetch_assoc();
        return $entry;
    }

    // Input should be formatted for queries
    function GetNameFromId($emp_id) {
        if ($emp_id == "NULL"){
            throw new InvalidArgumentException("No caller id provided");
        }

        $id_trimmed = trim($emp_id, "'");

        if (!is_numeric($id_trimmed) || ($id_trimmed != (int)$id_trimmed)) {
            throw new InvalidArgumentException("Employee id $emp_id is not an integer");
        }

        $get_name_query = "SELECT name
                           FROM employee
                           WHERE emp_id = $emp_id";

        $result = RunQuery($get_name_query);

        if($result->num_rows == 0){
            // Assuming a lack of result means the client provided an invalid caller id
            throw new InvalidArgumentException("No employee name could be found for id $emp_id");
        }

        $name_entry = $result->fetch_assoc();
        $name = $name_entry['name'];
        
        return $name;
    }

    function GetIdFromUsername($username) {
        // Get operator ID from their username
        $get_id_query = "SELECT emp_id
                         FROM user
                         WHERE username = $username";

        $result = RunQuery($get_id_query);

        if ($result->num_rows == 0) {
          throw new InvalidArgumentException("No matching entry found for username: $username");
        }
        
        $entry = $result->fetch_assoc();
        $id = $entry['emp_id'];

        return $id;
    }

    function refer_specialist($specialist, $problem_id, $time_of_referral, $priority) {
        // Create assignment
        $insert_assignment_query = "INSERT INTO assignment
                                    VALUES ($problem_id, $specialist, FROM_UNIXTIME($time_of_referral))";
        RunQuery($insert_assignment_query);

        // Update priority of issue
        $set_priority_query = "UPDATE issue
                               SET priority = $priority
                               WHERE problem_id = $problem_id";
        RunQuery($set_priority_query);

        // Send specialist notification about the referral
        $message = "You have been assigned a new issue - ID: $problem_id";
        SendNotification($specialist, $message,$problem_id);

        $email = GetUserEmail($specialist);
        $subject = "New assignment: $problem_id";
        SendEmail($email, $subject, $message);
    }

    // If new solution given, create a new solution entry. Else if using
    // a previous solution already linked to the parent issue, update that solution entry
    // linked to the parent issue.
    function provide_solution($problem_id, $solution, $parent_issue_id, $solution_id) {
        $problem_id = FormatForQuery($problem_id);
        $solution = FormatForQuery($solution);
        $parent_issue_id = FormatForQuery($parent_issue_id);
        $solution_id = FormatForQuery($solution_id);

        if (trim("'", $parent_issue_id) == "NULL"){
            // Create new solution entry with provided solution for this issue
            $solution_query = "INSERT INTO solution (parent_issue_id, solution)
                                VALUES ($problem_id, $solution)";
        } else if (trim("'", $solution_id) == "NULL") {
            // Create new solution entry with provided solution for parent issue
            $solution_query = "INSERT INTO solution (parent_issue_id, solution)
                                VALUES ($parent_issue_id, $solution)";
        } else {
            // Use the specified solution that is associated with the parent issue.
            // This is shown by incrementing the number of issues_solved by that solution by 1.
            $solution_query = "UPDATE solution
                                SET issues_solved = issues_solved + 1
                                WHERE solution_id = $solution_id";
        }

        // Update issue status to 'solved'
        $update_status_query = "UPDATE issue
                                SET status = 'solved'
                                WHERE problem_id = $problem_id";

        RunQuery($solution_query);
        RunQuery($update_status_query);
    }
?>