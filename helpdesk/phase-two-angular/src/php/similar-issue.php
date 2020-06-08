<?php
    require_once "connect-with-token-authentication.php";

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
        $value = trim($value);
        
        if (empty($value)) {
            return "NULL";
        } else {
            $value = AddEscapeCharsToApostrophes($value);
            $formatted_value = "'$value'";
            return $formatted_value;
        }
    }

    // _POST array is empty if input is JSON. This is a workaround for that issue.
    $rest_json_input = file_get_contents("php://input");
    $_POST = json_decode($rest_json_input, true);

    $problem_type = $_POST['problem_type'];
    $description = $_POST['description'];
    $device_type = $_POST['device_type'];
    $make = $_POST['make'];
    $model = $_POST['model'];
    $serial = $_POST['serial'];
    $software_name = $_POST['software_name'];
    $software_version = $_POST['software_version'];
    $department = $_POST['department'];

    // Get data on issues that share any features with the input issue. These are
    // the issues that will be ranked by similarity to the input issue based on their data.
    // Note that if the issues share the same make/model, they must also share the same device type,
    // similarly, if they share the same software version, it must be of the same software (identified by name)
    $query = "SELECT *
              FROM existing_issue_data_for_similarity
              WHERE problem_type = " . FormatForQuery($problem_type) .
                " OR device_type = " . FormatForQuery($device_type) .
                " OR software_name = " . FormatForQuery($software_name) .
                " OR department = " . FormatForQuery($department);

    $result = $conn->query($query);

    if (!$result) {
        die("Error: " . $conn->error);
    }
    $conn->close();


    // Calcualate a score for every existing issue indicating that issue's similarity to the
    // input issue
    $scored_issues = array();
    while($existing_issue = $result->fetch_assoc()) {
        $similarity_score = 0;

        if ($existing_issue['problem_type'] == $problem_type) {
            $similarity_score += 4;
        }

        if ($existing_issue['device_type'] == $device_type) {
            $similarity_score += 2;
        }

        if ($existing_issue['make'] == $make) {
            $similarity_score += 3;
        }

        if ($existing_issue['model'] == $model) {
            $similarity_score += 4;
        }

        if ($existing_issue['hardware_serial'] == $serial) {
            $similarity_score += 5;
        }
        
        if ($existing_issue['software_name'] == $software_name) {
            $similarity_score += 2;
        }

        if ($existing_issue['software_version'] == $software_version) {
            $similarity_score += 4;
        }

        if ($existing_issue['department'] == $department) {
            $similarity_score += 1;
        }

        // An issue getting many calls reporting it seems more likely to have the
        // current call be about the same issue, hence the increase in similarity score
        $similarity_score += ($existing_issue['total_calls'] - 1) * 0.5;

        // The more common a problem is, the more likely it seems for an issue
        // to also be that same problem.
        $similarity_score += $existing_issue['total_child_issues'] * 0.5;

        $scored_issues[] = array(
            'similarity_score' => $similarity_score,
            'problem_id' => $existing_issue['problem_id'],
            'description' => $existing_issue['description'],
            'problem_type' => $existing_issue['problem_type'],
            'device_type' => $existing_issue['device_type'],
            'make' => $existing_issue['make'],
            'model' => $existing_issue['model'],
            'hardware_serial' => $existing_issue['hardware_serial'],
            'software_name' => $existing_issue['software_name'],
            'software_version' => $existing_issue['software_version'],
            'department' => $existing_issue['department']
        );
    }

    // Sort by similarity score in descending order
    $similarity_scores = array_column($scored_issues, 'similarity_score');
    array_multisort($similarity_scores, SORT_DESC, $scored_issues);
    
    echo json_encode($scored_issues);
?>
