<?php
	require_once "connect.php";

	// _POST array is empty if input is in JSON. This is a workaround for that issue.
	$rest_json_input = file_get_contents("php://input");
	$_POST = json_decode($rest_json_input, true);

	$username = $_POST['username'];
	$password = $_POST['password'];

	$password_hash = hash('sha256', $password);

	$sql = "SELECT role FROM user WHERE username = '$username' AND password_hash = '$password_hash'";
	$result = mysqli_query($conn, $sql);

	$resultRows = mysqli_num_rows($result);

	// TO-DO: Throw exception here, instead of using a long if-else statement
	if ($resultRows == 0) {
		echo "Username or password incorrect";
	} else {
		$row = mysqli_fetch_assoc($result);
		$role = $row['role'];

		function returnbase64($value)
		{
			return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($value));
		}

		$header = json_encode(['type' => 'JWT', 'alg' => 'HS256']);
		$payload = json_encode(['username' => $username, 'role' => $role, 'timeLoggedIn' => time()]);

		$base64UrlHeader = returnbase64($header);
		$base64UrlPayload = returnbase64($payload);

		$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'miahelpdesk');
		$base64UrlSignature = returnbase64($signature);

		$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

		// Store token in the user's record in the database.
		$insertTokenSQL = "UPDATE user SET token ='$jwt' WHERE username = '$username'";
		mysqli_query($conn, $insertTokenSQL);

		echo json_encode(array("access_token" => $jwt, "role" => $role));
	}

	$conn->close();
	