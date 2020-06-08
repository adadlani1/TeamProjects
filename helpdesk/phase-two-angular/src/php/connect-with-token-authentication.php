<?php
    require_once "connect.php";

    function IsValidToken($token) {
        global $conn;

        //decode the token
        $sections = explode('.', $token);
        $header_base64 = $sections[0];
        $payload_base64 = $sections[1];
        $token_signature = base64_decode($sections[2]);

        $calculated_signature = hash_hmac('sha256', $header_base64 . "." . $payload_base64, 'miahelpdesk');

        $is_valid_signature = $token_signature == $calculated_signature;

        $payload = json_decode(base64_decode($payload_base64), true);
        $username = $payload['username'];

        $query = "SELECT token FROM user WHERE username = '$username'";
        $result = $conn->query($query);

        if (!$result) {
            die("Error: " . $conn->error);
        }

        $row = $result->fetch_assoc();

        if (!$row) {
            die("Error: No token entry found for $username");
        }

        $token_is_whitelisted = ($token == $row['token']);

        return $is_valid_signature && $token_is_whitelisted;
    }

    $headers = apache_request_headers();

    // No token provided
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        header('WWW-Authenticate: Bearer error="no_token"');
        die();
    }

    // Extract token from header
    $auth = $headers['Authorization'];
    $token = explode(' ', $auth)[1];

    // Token is invalid
    if (!IsValidToken($token)) {
        http_response_code(401);
        header('WWW-Authenticate: Bearer error="invalid_token"');
        die();
    }
?>
