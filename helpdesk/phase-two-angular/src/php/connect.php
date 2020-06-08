<?php
    $host = "miahelpdesk.tk";
    $username = "team16";
    $password = "dbteam16";
    $dbname = "helpdesk";

    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }
?>
