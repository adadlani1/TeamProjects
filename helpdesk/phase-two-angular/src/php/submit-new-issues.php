<?php
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);
    
    $issues = $_POST['issues'];
    
    try {
        // Set up a transaction. All following queries must execute successfully or all changes
        // are rolled back. This is to prevent an incomplete submission of the new issue, where
        // the issue data is only partially inserted into the database due to one of the queries failing.
        $conn->begin_transaction();
    
        // Using same creation time for all issues
        $time_now = time();
    
        // Validate and format all issue inputs then submit
        foreach ($issues as $issue) {
            $issue = ValidateAndFormatIssueInput($issue);

            // Fill in missing required detail from issue input before submitting
            $issue['operator_id'] = GetIdFromUsername($issue['operator_username']);
    
            SubmitNewIssue($issue, $time_now);
        }
    
        $conn->commit();    // New issues submitted successfully so commit transaction.
    } catch (Exception $e) {
        $conn->rollback(); // New issues not submitted successfully so revert any changes
        HandleExceptionAndEndScript($e);
    }
    

    // Function throws InvalidArgumentException on any detected invalid input
    function ValidateAndFormatIssueInput($issue) {
        // Trim all inputs of surrounding whitespace before validating
        foreach ($issue as $key => $value) {
            $issue[$key] = trim($issue[$key]);
        }
        
        // Input validation check. Throws exception on invalid input
        CheckNewIssueSubmissionInputIsValid($issue);

        // Format all inputs in issue array so that they're ready for use in SQL queries
        foreach ($issue as $key => $value) {
            $formatted_value = FormatForQuery($value);
            $issue[$key] = $formatted_value;
        }

        return $issue;
    }


    // Throws an InvalidArgumentException if invalid input is detected
    function CheckNewIssueSubmissionInputIsValid($issue) {
        global $conn;
        
        // Validate priority
        $valid_priority_values = [null, '1', '2', '3'];
        if (!in_array($issue['priority'], $valid_priority_values)) {
            throw new InvalidArgumentException("'{$issue['priority']}' is not a valid priority value");
        }
        
        // Validate status
        $valid_status_values = ['open', 'referred', 'solved'];
        if ($issue['status'] == null) {
            throw new InvalidArgumentException("No issue status provided.");
        } else if (!in_array($issue['status'], $valid_status_values)) {
            throw new InvalidArgumentException("'{$issue['status']}' is not a valid issue status.");
        }
        
        // Null check for problem type and description. If parent issue ID is provided, these
        // will take on the value of the parent issue's problem type and description instead.
        if ($issue['parent_issue_id'] == null) {
            if ($issue['problem_type'] == null) {
                throw new InvalidArgumentException("No problem type or parent issue ID provided.");
            }
            if ($issue['description'] == null) {
                throw new InvalidArgumentException("No description or parent issue ID provided.");
            }
        }

        // Hardware and software fields can't both be null
        if (!$issue['serial'] && !$issue['software_id']) {
            throw new InvalidArgumentException("Hardware and software fields cannot both be null.");
        }

        if ($issue['status'] == 'solved') {
            if ($issue['parent_issue_id'] == null) {
                if ($issue['solution'] == null) {
                    throw new InvalidArgumentException("Issue status is 'solved', but there is no parent issue id or solution provided.");
                } else if ($issue['solution_id'] != null) {
                    throw new InvalidArgumentException("Solution id provided when there is no parent issue id.");
                }

            } else if ($issue['solution_id'] == null) {
                if ($issue['solution'] == null) {
                    throw new InvalidArgumentException("Issue status is 'solved', and a parent issue id was provided, but no solution or solution_id was given. Please provide one.");
                }
            } else {
                // New solution and existing solution ID both provided. Cannot determine which to use, so throw error.
                if ($issue['solution'] != null) {
                    throw new InvalidArgumentException("Issue status is 'solved', and a parent issue id is provided, but both solution and solution_id are given too. Please only provide one.");
                }

                // Check is solution ID exists in solution table
                $query = "SELECT * FROM solution WHERE solution_id = '{$issue['solution_id']}'";
                $result = RunQuery($query);
                if ($result->num_rows == 0) {
                    throw new InvalidArgumentException("Solution ID '{$issue['solution_id']}' not found in solution table.");
                }
                
                $row = $result->fetch_assoc();
                $solution_parent_issue_id = $row['parent_issue_id'];
        
                // Check if input parent issue ID matches the parent issue ID associated with the solution specified
                if ($issue['parent_issue_id'] != $solution_parent_issue_id) {
                    throw new InvalidArgumentException("Parent issue ID provided does not match with the parent issue ID associated with the solution ID given");
                }

            }
        } else if ($issue['solution'] != null) {
            throw new InvalidArgumentException("Solution provided when status of issue is not 'solved'.");
        } else if ($issue['solution_id'] != null) {
            throw new InvalidArgumentException(("Solution ID provided when status of issue is not 'solved'."));
        }

        // Referred but no specialist provided
        if (($issue['status'] == 'referred') && !$issue['specialist']) {
            throw new InvalidArgumentException("Status is 'referred' but no specialist username was provided.");
        }

        // Not referred but specialist provided
        if (($issue['status'] != 'referred') && $issue['specialist']) {
            throw new InvalidArgumentException("Status is not 'referred' but a specialist was provided.");
        }
    }
    
    
    function SubmitNewIssue($issue, $time) {
        global $conn;

        // Extract required inputs
        $status = $issue['status'];
        $serial = $issue['serial'];
        $software_id = $issue['software_id'];
        $problem_type = $issue['problem_type'];
        $description = $issue['description'];
        $note = $issue['note'];
        $priority = $issue['priority'];
        $operator_id = $issue['operator_id'];
        $caller_id = $issue['caller_id'];
        $specialist = $issue['specialist'];
        $solution = $issue['solution'];
        $parent_issue_id = $issue['parent_issue_id'];
        $solution_id = $issue['solution_id'];

        if ($parent_issue_id != "NULL") {
            // Fetch certain parent issue details
            $get_parent_issue = "SELECT problem_type, description
                                 FROM issue
                                 WHERE problem_id = $parent_issue_id";
            $result = RunQuery($get_parent_issue);
            $parent_issue_details = $result->fetch_assoc();
            
            // Overwrite certain issue details with parent issue's details
            $problem_type = FormatForQuery($parent_issue_details['problem_type']);
            $description = FormatForQuery($parent_issue_details['description']);
        }
    
        // Create issue entry
        $insert_issue_query = "INSERT INTO issue (status, hardware_serial, software_id, problem_type, description, priority, parent_issue_id)
                                VALUES ($status, $serial, $software_id, $problem_type, $description, $priority, $parent_issue_id)";
        $problem_id = RunInsertQueryAndReturnGeneratedID($insert_issue_query);

        // If solved, and if new solution given, create a new solution entry. Else if using
        // a previous solution already linked to the parent issue, update that solution entry
        // linked to the parent issue.
        if ($status == "'solved'") {
            provide_solution($problem_id, $solution, $parent_issue_id, $solution_id);
        }

        // Append call note entry
        $call_note = CreateCallNoteMessage($caller_id);
        $insert_call_note_query = "INSERT INTO issue_note (problem_id, time_created, note)
                                    VALUES ($problem_id, FROM_UNIXTIME($time), $call_note)";
        $call_note_id = RunInsertQueryAndReturnGeneratedID($insert_call_note_query);

        // Log call details
        $insert_call_query = "INSERT INTO calls (time_of_call, operator_id, caller_id)
                                VALUES (FROM_UNIXTIME($time), $operator_id, $caller_id)";
        $call_id = RunInsertQueryAndReturnGeneratedID($insert_call_query);
        
        // Link call to its corresponding note
        $insert_issue_note_call_query = "INSERT INTO issue_note_call
                                            VALUES ($call_note_id, $call_id)";
        RunQuery($insert_issue_note_call_query);
        
        // Append note provided by operator if there is one
        if ($note != "NULL") {
            $insert_operator_note_query = "INSERT INTO issue_note (problem_id, time_created, note)
                                            VALUES ($problem_id, FROM_UNIXTIME($time), $note)";
            RunQuery($insert_operator_note_query);
        }

        // Refer issue to the specified specialist if a referral was made
        if ($status == "'referred'") {
            // This creates the assignment entry and creates the corresponding issue note
            refer_specialist($specialist, $problem_id, $time, $priority);

            // Create note message
            $specialist_name = GetNameFromUsername($specialist);
            $specialist_name = ucwords($specialist_name);   // Capitalise name for presentation in issue note
            $note = "'Referred to $specialist_name.'";

            $referral_note_query ="INSERT INTO issue_note (problem_id, time_created, note)
                                VALUES ($problem_id, FROM_UNIXTIME($time), $note)";

            RunQuery($referral_note_query);
        }
    }
    

    // Assumes input is formated for query
    function CreateCallNoteMessage($caller_id) {
        $caller_name = GetNameFromId($caller_id);
        $caller_name = ucwords($caller_name); // Capitalise first letters of name.
        return "'$caller_name called in to report this issue.'";
    }
?>
