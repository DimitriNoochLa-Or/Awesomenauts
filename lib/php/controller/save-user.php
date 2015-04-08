<?php
require_once(__DIR__ . "/../model/config.php");
//calls the config file
//5 variables being passed thru from my game 
$exp = filter_input(INPUT_POST, "exp", 	FILTER_SANATIZE_STRING);//5 experience varibles
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANATIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANATIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANATIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANATIZE_STRING);

$query = $_SESSION["connection"]->query("UPDATE users SET"
	//stores the variables
	. "exp = $exp, "
	. "exp1 = $exp1, "
	. "exp2 = $exp2, "
	. "exp3 = $exp3, "
	. "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");// save the data for current variables 
	);

if($query){
	echo "true";

}else{
	echo "<p>" $_SESSION["connected"]->error . "</p>";
}


















