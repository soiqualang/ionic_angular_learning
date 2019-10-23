<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}
//require('check.php');
require('config.php');
require('function.php');
if(isset($_REQUEST['tblname'])){
	$tblname=$_REQUEST['tblname'];
	$postdata = file_get_contents("php://input");
	//echo $postdata;
	$request = json_decode($postdata);
	//echo var_dump($request);
	//echo json_encode($request);
	//echo key((array)$request);
	//echo var_dump(array_keys((array)$request));
	$keys=array_keys((array)$request);
	//echo $keys[1];
	/* $arr1 = get_object_vars($request);
	echo var_dump($arr1); */
	$vals=[];
	foreach ((array) $request as $var => $val) {
		//echo $val;
		array_push($vals,$val);
	}
	//echo var_dump($vals);
	insert_table($tblname,$keys,$vals);
	//echo '{state:\'Đã lưu\'}';
	//echo '{\'Đã lưu\'}';
	//echo 'Đã lưu';
}
?>