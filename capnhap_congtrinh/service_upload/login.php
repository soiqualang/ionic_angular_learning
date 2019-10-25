<?php
ob_start();
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
  // Các giá trị dược lưu trong biến $_POST
  // Kiểm tra nếu được post
  if($_POST) {
      // Đưa dữ liệu vào các biến
        $email=$_POST['email']; 
        $password=$_POST['password']; 
        
        $email=strip_tags(pg_escape_string($email)); 
        $password=strip_tags(pg_escape_string($password)); 
        
        
      // Phần xử lý của các bạn..
        $sql = "SELECT * FROM users WHERE email='$email' AND password ='$password'"; 
		$dbcon = pg_connect("dbname=".PG_DB." password=".PG_PASS." host=".PG_HOST." user=".PG_USER." port=".PG_PORT);
        $member = pg_query($dbcon,$sql);
        if (pg_num_rows($member)==1)//Thành công     
        {    
            $_SESSION['email'] = $email; // Lưu email vào session
			$_SESSION['fullname']=getElement('users','fullname','email',$email);
			$_SESSION['id'] = getElement('users','id','email',$email);
			$_SESSION['login'] = true;
			
			@$user_info->email=$_SESSION['email'];
			@$user_info->fullname=$_SESSION['fullname'];
			@$user_info->id=$_SESSION['id'];
			@$user_info->login=$_SESSION['login'];
			@$user_info->login_mess='Bạn đã đăng nhập thành công!';
			@$user_info->login_classdiv='success';
			$user_info_json = json_encode($user_info);
			echo $user_info_json;
            //echo '<p class="success">Chúc mừng bạn <span style="color:blue">'.$_SESSION['email'].'</span> đã đăng nhập thành công <br><a href="logout.php">Đăng xuất</a> !</p>'; 
        }else{ //Thất bại
			@$user_info->login=false;
			@$user_info->login_mess='Email hoặc Password không đúng!';
			@$user_info->login_classdiv='error';
			//@$user_info->login_mess=$sql;
			$user_info_json = json_encode($user_info);
			echo $user_info_json;
            // echo '<p class="success">email hoặc password không đúng !</p>'; 
		}
  }
ob_end_flush();
?>