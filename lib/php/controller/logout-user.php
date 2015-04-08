<?php 
	require_once(__DIR__ . "/../model/config.php");
//unsets session and autthenticated
	unset($_SESSION["authenticated"]);
//destroys session
	session_destroy();
	//makes it so my informatino is destroyed
	header("Location: " . $path . "blog.php")// redirects user

 ?>