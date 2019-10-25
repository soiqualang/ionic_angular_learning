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

require('config.php');
require('function.php');

if(isset($_GET['tbl'])){
	$tbl=$_GET['tbl'];
	$sql="select array_to_json(array_agg(row_to_json(t))) as kq
		from (
		  select * from $tbl
		) t";
		$dbcon = pg_connect("dbname=".PG_DB." password=".PG_PASS." host=".PG_HOST." user=".PG_USER." port=".PG_PORT);
		$query = pg_query($dbcon,$sql); 

	while ($row = pg_fetch_array($query)){
		echo $row['kq'];
	}
	pg_close($dbcon);
}
?>