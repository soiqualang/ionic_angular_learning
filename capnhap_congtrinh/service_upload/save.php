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
function add($tbl,$cols){
		$value=array();
		$field=array();
		$colarr=explode(',',$cols);
		for($i=0;$i<count($colarr);$i++){
			//echo $_POST[$colarr[$i]];
			array_push($value,urldecode($_POST[$colarr[$i]]));
			array_push($field,$colarr[$i]);
		}
		insert_table($tbl,$field,$value);
		echo 'Đã gửi!';
}
if(isset($_POST['ajaxbtn'])){
	$app=$_POST['app'];
	if($app=='solieu_congtrinh'){
		add('solieu_congtrinh','trangthai,baocaohuhong,iddistricts,idwards,lon,lat,idusers,ngaythunhan,ghichu,hinh1,hinh2,hinh3');
	}
	if($app=='solieu_thuyvan'){
		add('solieu_thuyvan','doman,mucnuoc,iddistricts,idwards,lon,lat,idusers,ngaythunhan,ghichu');
	}	
}
?>