<?php
    require_once "connect-with-token-authentication.php";

    $specialists_data_query = "SELECT employee.emp_id, employee.name, specialist.username, site.name AS site_name, site.country, specialist.is_available 
                               FROM employee
                               JOIN site ON employee.site_id = site.site_id 
                               JOIN user ON user.emp_id = employee.emp_id 
                               JOIN specialist ON user.username = specialist.username 
                               ORDER BY employee.emp_id";

    $specialists_data_results = $conn->query($specialists_data_query);

    $specialists_current_jobs_query = "SELECT employee.emp_id, issue.problem_id, issue.description
                                       FROM latest_assignment
                                       JOIN issue ON issue.problem_id = latest_assignment.problem_id
                                       JOIN user ON latest_assignment.username = user.username
                                       JOIN employee ON user.emp_id = employee.emp_id
                                       WHERE issue.status = 'referred'
                                       ORDER BY employee.emp_id";

    $specialists_current_jobs_results = $conn->query($specialists_current_jobs_query);

    $conn->close();

    // Convert results into php arrays
    $specialists_data = array();
    while($row = $specialists_data_results->fetch_assoc()) {
        $specialists_data[] = $row;
    }

    $specialists_jobs = array();
    while($row = $specialists_current_jobs_results->fetch_assoc()){
        $specialists_jobs[] = $row;
    }


    // For each specialist
    for ($i = 0, $j = 0; $i < sizeof($specialists_data); $i++) {
        $id = $specialists_data[$i]['emp_id'];
        $jobs = array();

        // Add all the jobs assigned to this specialist to their jobs list.
        while ( ($j < sizeof($specialists_jobs)) && ($id == $specialists_jobs[$j]['emp_id']) ) {
            unset($specialists_jobs[$j]['emp_id']);     // Don't need their ID in the jobs details, so it's removed
            $jobs[] = $specialists_jobs[$j];

            $j++; // Go to next job
        }

        // Add their jobs data to that specialist's data entry
        $specialists_data[$i]['num_of_jobs'] = sizeof($jobs);
        $specialists_data[$i]['jobs'] = $jobs;

        // Remove their ID from entry. It was only needed to match them to their jobs in the list
        unset($specialists_data[$i]['emp_id']);

        // Convert is_available field ('1', or '0') to a boolean value
        $specialists_data[$i]['is_available'] = (boolean)$specialists_data[$i]['is_available'];
    }

    // Sort by number of jobs in descending order
    $num_of_jobs = array_column($specialists_data, 'num_of_jobs');
    array_multisort($num_of_jobs, SORT_DESC, $specialists_data);

    echo json_encode($specialists_data);
?>