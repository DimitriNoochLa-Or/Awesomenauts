<?php  
 require_once(__DIR__ . "/../model/config.php");


 $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
 $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);


 $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";// salt gives a unique hash so it encrypts our pssword with random numbers

$hashedPassword = crypt($password, $salt);

$query = $_SESSION["connection"]->query("INSERT INTO users SET "
	. "username = '$username',"
	. "password = '$hashedPassword',"
	. "salt = '$salt', "
	. "exp = 0, "
	. "exp1 = 0, "
	. "exp2= 0, "
	. "exp3 = 0, "
	. "exp4 = 0");

	$_SESSION["name"] = $username;

	if($query) {
		//Need this for ajax on index.php
		echo "false";
	}

	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}