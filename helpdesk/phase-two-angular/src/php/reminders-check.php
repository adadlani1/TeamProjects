<?php
    require_once "connect-with-token-authentication.php";
    require_once "contact-functions.php";
    
    // Delete all entries in reminder table of issues that have had their status changed since last check.
    // Reminder timers are reset when going from 'open' to 'referred', or no reminders will be done
    // if issue is 'solved'. Either way, the entries should be deleted from the table.
    $deletion_query = 'DELETE reminder FROM reminder
                       LEFT JOIN issue ON issue.problem_id = reminder.problem_id
                       AND reminder.status_at_last_check = issue.status
                       WHERE issue.problem_id IS NULL';
    $result = $conn->query($deletion_query);
    
    if (!$result) {
        die("Error: " . $conn->error);
    }
    
    // Get the problem ID, and relevant previous reminder times of all open issues atleast 2 days old
    $open_issues_that_might_need_reminders_query =
        "SELECT issue_creation_time.problem_id, time_created, time_reminded_first_caller, time_reminded_operator
         FROM issue_creation_time
         LEFT JOIN reminder ON issue_creation_time.problem_id = reminder.problem_id
         WHERE status = 'open'
           AND time_created < (CURRENT_TIMESTAMP() - INTERVAL 2 DAY)";

    // Get the problem ID, and relevant previous reminder times of all referred issues atleast 1 week old
    $referred_issues_that_might_need_reminders_query = 
        "SELECT issue_creation_time.problem_id, time_of_last_referral, time_reminded_operator, time_reminded_specialist
         FROM issue_creation_time
         LEFT JOIN reminder ON issue_creation_time.problem_id = reminder.problem_id
         WHERE status = 'referred'
           AND time_created < (CURRENT_TIMESTAMP() - INTERVAL 10 DAY)";
    
    $open_issues_result = $conn->query($open_issues_that_might_need_reminders_query);
    $referred_issues_result = $conn->query($referred_issues_that_might_need_reminders_query);
    
    $conn->close();

    if (!$open_issues_result || !$referred_issues_result) {
        die("Error: " . $conn->error);
    }
    
    // Keep track of which open issues actually need reminders sent out for, and to whom.
    // Assumes all issues to be checked are atleast 2 days old
    $open_issues_that_need_reminders = array();
    while($row = $open_issues_result->fetch_assoc()) {
        $time_created = strtotime($row['time_created']);
        $time_reminded_caller = $row['time_reminded_first_caller'];
        $time_reminded_operator = $row['time_reminded_operator'];
        $time_2_days_ago = strtotime("-2 days");
        $time_3_days_ago = strtotime("-3 days");
        $remind_operator = false;
        $remind_caller = false;

        // Remind operator if it's been 3 days since issue creation, and if they've already
        // been reminded, remind them again only if it's been 3 days since their last reminder
        if ( ($$time_created < $time_3_days_ago)  && 
             (!$time_reminded_operator) || ($time_reminded_operator < $time_3_days_ago) ) {
            $remind_operator = true;
        }

        // Remind caller if it's been 2 days since they've called to report the issue and were suggested a solution. 
        // If they've already been reminded, remind them again if it's been 2 days since their last reminder
        if ((!$time_reminded_caller) || ($time_reminded_caller < $time_2_days_ago)) {
            $remind_caller = true;
        }

        // If a reminder needs to be sent out regarding this issue, add it to the array
        if ($remind_operator|| $remind_caller) {
            $entry = array('problem_id' => $row['problem_id'],
                           'remind_operator' => $remind_operator,
                           'remind_caller' => $remind_caller);
            $open_issues_that_need_reminders[] = $entry;
        }
    }

    // Keep track of which open issues actually need reminders sent out for, and to whom.
    $referred_issues_that_need_reminders = array();
    while($row = $referred_issues_result->fetch_assoc()) {
        $time_of_last_referral = strtotime($row['time_of_last_referral']);
        $time_reminded_specialist = $row['time_reminded_specialist'];
        $time_reminded_operator = $row['time_reminded_operator'];
        $time_10_days_ago = strtotime("-10 days");
        $time_14_days_ago = strtotime("-14 days");
        $remind_operator = false;
        $remind_specialist = false;

        // Remind operator if it's been 14 days since last referral, and if they've already
        // been reminded since last referral, remind them again only if it's been 14 days since the last reminder
        if ( ($time_of_last_referral < $time_14_days_ago)  && 
             (!$time_reminded_operator) || ($time_reminded_operator < $time_14_days_ago) ) {
            $remind_operator = true;
        }

        // Remind specialist if it's been 10 days since they've been referred the issue, and if 
        // they've already been reminded, remind them again if it's been 10 days since their last reminder
        if ( ($time_of_last_referral < $time_10_days_ago) &&
             (!$time_reminded_specialist) || ($time_reminded_specialist < $time_10_days_ago)) {
            $remind_specialist = true;
        }

        // If a reminder needs to be sent out regarding this issue, add it to the array
        if ($remind_operator|| $remind_specialist) {
            $entry = array('problem_id' => $row['problem_id'],
                           'remind_operator' => $remind_operator,
                           'remind_specialist' => $remind_specialist);
            $referred_issues_that_need_reminders[] = $entry;
        }
    }

    $open_issues_that_need_reminders = array();
    $open_issues_that_need_reminders[] = array('problem_id' => 5,
                                               'remind_operator' => true,
                                               'remind_caller' => true);
    
    try {
        SendReminders($open_issues_that_need_reminders, $referred_issues_that_need_reminders);
    } catch (Exception $e) {
        HandleExceptionAndEndScript($e);
    }

    function SendReminders($open_issues, $referred_issues) {
        foreach ($open_issues as $issue) {
            $problem_id = $issue['problem_id'];
            $issue_info = new IssueContactDetails($problem_id);

            if ($issue['remind_caller'] == true) {
                RemindCallerAboutIssue($issue_info);
            }

            if ($issue['remind_operator'] == true) {
                RemindOperatorAboutIssue($issue_info, 'open');
            }
        }

        foreach ($referred_issues as $issue) {
            $problem_id = $issue['problem_id'];
            $issue_info = new IssueContactDetails($problem_id);

            if ($issue['remind_specialist'] == true) {
                RemindSpecialistAboutIssue($issue_info);
            }

            if ($issue['remind_operator'] == true) {
                RemindOperatorAboutIssue($issue_info, 'referred');
            }
        }
    }
?>