<?php
    require_once "connect-with-token-authentication.php";
    require_once "utility-functions.php";
    
    class IssueContactDetails {
        public $problem_id;
        public $description;
        public $status;
        public $caller_name;
        public $caller_email;
        public $caller_telephone;
        public $caller_extension;
        public $operator_username;
        public $operator_email;
        public $specialist_username;
        public $specialist_telephone;
        public $specialist_extension;
        public $specialist_email;
        
        public function __construct($problem_id) {
            $this->LoadIssueContactDetails($problem_id);
        }
        
        private function LoadIssueContactDetails($problem_id) {            
            // Get contact details from premade view 'isssue_contact_details' for the given problem_id
            $query = "SELECT description, status, caller_name, caller_email, caller_telephone,
                             caller_extension, operator_username, operator_email, 
                             specialist_username, specialist_email, specialist_telephone, specialist_extension
                      FROM issue_contact_details
                      WHERE problem_id = $problem_id";

            $result = RunQuery($query);
                    
            if ($result->num_rows == 0) {
                throw new InvalidArgumentException("Error: matching issue found in issue_contact_details for problem id $problem_id");
            }

            $row = $result->fetch_assoc();
            
            // Store the results in this object's properties
            $this->problem_id = $problem_id;
            $this->description = $row['description'];
            $this->status = $row['status'];
            $this->caller_name = $row['caller_name'];
            $this->caller_telephone = $row['caller_telephone'];
            $this->caller_extension = $row['caller_extension'];
            $this->caller_email = $row['caller_email'];
            $this->operator_username = $row['operator_username'];
            $this->operator_email = $row['operator_email'];
            $this->specialist_username = $row['specialist_username'];
            $this->specialist_telephone = $row['specialist_telephone'];
            $this->specialist_extension = $row['specialist_extension'];
            $this->specialist_email = $row['specialist_email'];
        }
    }

    function RemindCallerAboutIssue($issue_info) {
        SendCallerReminderEmail($issue_info);
        UpdateReminderEntry($issue_info, 'caller');
    }

    function RemindOperatorAboutIssue($issue_info) {
        if ($issue_info->status == "open") {
            RemindOperatorAboutOpenIssue($issue_info);
        } else {
            RemindOperatorAboutReferredIssue($issue_info);
        }

        UpdateReminderEntry($issue_info, 'operator');
    }

    function RemindOperatorAboutOpenIssue($issue_info) {
        SendOperatorOpenIssueReminderNotification($issue_info);
        SendOperatorOpenIssueReminderEmail($issue_info);
    }
    
    function RemindOperatorAboutReferredIssue($issue_info) {
        SendOperatorReferredIssueReminderNotification($issue_info);
        SendOperatorReferredIssueReminderEmail($issue_info);
    }
    
    function RemindSpecialistAboutIssue($issue_info) {
        SendSpecialistReminderNotification($issue_info);
        SendSpecialistReminderEmail($issue_info);
        UpdateReminderEntry($issue_info, 'specialist');
    }
    
    function UpdateReminderEntry($issue_info, $role_of_person_that_has_been_reminded) {
        // Specify appropriate field depending on the role of the person that has been reminded
        $time_reminded_field_name = "";
        switch($role_of_person_that_has_been_reminded) {
            case "caller":
                $time_reminded_field_name = "time_reminded_first_caller";
                break;
            case "operator":
                $time_reminded_field_name = "time_reminded_operator";
                break;
            case "specialist":
                $time_reminded_field_name = "time_reminded_specialist";
                break;
        }

        $time_now = time();
        
        // Insert entry about the reminder if none exists. If a reminder entry already exists for this problem,
        // just update it. Either way, latest entry should have the current time for the appropriate time_reminded field
        $query = "INSERT INTO reminder (problem_id, status_at_last_check, $time_reminded_field_name)
                    VALUES ($issue_info->problem_id, '$issue_info->status', FROM_UNIXTIME($time_now))
                    ON DUPLICATE KEY UPDATE $time_reminded_field_name = FROM_UNIXTIME($time_now)";

        RunQuery($query);
    }

    function SendCallerReminderEmail($issue_info) {
        $name = $issue_info->caller_name;
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;

        $subject = "Unresolved issue $problem_id";
        
        $message = "Hi $name,\nDon't forget to get in touch with the helpdesk about the problem '$description'"
        . " with ID: $problem_id, and let them know whether their suggested solution worked or not.";
        
        $email = $issue_info->caller_email;
        SendEmail($email, $subject, $message);
    }

    function SendOperatorOpenIssueReminderNotification($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;

        $message = "There hasn't been an update on the problem '$description' with ID: $problem_id recently.
                    Try contacting the caller.";
        
        $operator_username = $issue_info->operator_username;
        SendNotification($operator_username, $message, $problem_id);
    }

    function SendOperatorOpenIssueReminderEmail($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;
        $specialist_telephone = $issue_info->specialist_telephone;
        $specialist_extension = $issue_info->specialist_extension;
        $specialist_email = $issue_info->specialist_email;

        $subject = "Unresolved issue $problem_id";

        $message = "The referred issue '$description' with ID: $problem_id has not been marked as solved
                    for a while. Try contacting the technical specialist who is currently assigned the issue
                    to see if the issue is resolved or not.

                    Technical specialist contact details:
                    Telephone number - $specialist_telephone Ext: $specialist_extension
                    Email address: $specialist_email";
        
        $operator_email = $issue_info->operator_email;
        SendEmail($operator_email, $subject, $message);
    }

    function SendOperatorReferredIssueReminderNotification($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;

        $message = "The referred issue '$description' with ID: $problem_id has not been marked as solved
                    for a while. Try contacting the technical specialist who is currently assigned the issue
                    to see if the issue is resolved or not.";
        
        $operator_username = $issue_info->operator_username;
        SendNotification($operator_username, $message, $problem_id);
    }

    function SendOperatorReferredIssueReminderEmail($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;
        $caller_name = $issue_info->caller_name;
        $caller_telephone = $issue_info->caller_telephone;
        $caller_extension = $issue_info->caller_extension;
        $caller_email = $issue_info->caller_email;

        $subject = "Unresolved issue $problem_id";

        $message = "There hasn't been an update on the problem '$description' with ID: $problem_id recently.
                    Try contacting the first person who reported the issue again to see if the solution they
                    were suggested has worked or not.
                    
                    First caller contact details:
                    Name - $caller_name
                    Telephone number - $caller_telephone Ext: $caller_extension
                    Email address: $caller_email";
        
        $operator_email = $issue_info->operator_email;
        SendEmail($operator_email, $subject, $message);
    }

    function SendSpecialistReminderNotification($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;

        $message = "Your current assignment '$description' with ID: $problem_id has not been marked as solved
                    for a while. If it has been solved already, please provide the solution.";
        
        $specialist_username = $issue_info->specialist_username;
        SendNotification($specialist_username, $message, $problem_id);
    }

    function SendSpecialistReminderEmail($issue_info) {
        $problem_id = $issue_info->problem_id;
        $description = $issue_info->description;
        $username = $issue_info->specialist_username;

        $subject = "Unresolved issue $problem_id";

        $message = "Hi $username,\nThe issue '$description' with ID: $problem_id hasn't been marked as solved for a while.
                    If the issue has been resolved already, please provide the solution for it.";
        
        $operator_email = $issue_info->operator_email;
        SendEmail($operator_email, $subject, $message);
    }

    function SendNotification($recipitent_username, $message, $problem_id) {
        $recipitent_username = FormatForQuery($recipitent_username);
        $message = FormatForQuery($message);    

        $query = "INSERT INTO notification (username, notification, problem_id)
                  VALUES ($recipitent_username, $message, $problem_id)";
                  
        RunQuery($query);
    }

    function SendEmail($address, $subject, $message) {
        $headers = 'From:noreply@miahelpdesk.tk'; 
        mail($address, $subject, $message, $headers);
    }
?>
