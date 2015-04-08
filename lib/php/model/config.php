<?php
	require_once(__DIR__ . "/Database.php");
	session_start();
	session_regenerate_id(true);

	$path = "/Awesomenauts/php/";
	//create a path variable so it takes the path to the blog fileS
	
	// variables for the host name ,username and password
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";
//created variable connection
	if(!isset ($_SESSION["connection"])) {
		$connection = new Database($host, $username , $password, $database);
		$_SESSION["connection"] = $connection;
	}