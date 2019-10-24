import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serv_URL='http://dev.dothanhlong.org/t1/';

  constructor(public http: HttpClient) { }

  postData(data:any,tblname:any){
    return new Promise(resolve => {
      this.http.post(this.serv_URL+'t1.php'+'?tblname='+tblname,data,{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
          resolve(res);
        })
    });
  }

  writeCookie(name:any,value:any,days:any) {
    //var sId = 's234543245';
    //writeCookie('sessionId', sId, 3);
    var date:any, expires:any;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  readCookie(name:any) {
    //var sId = readCookie('sessionId')
    var i:any, c:any, ca:any, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
  }

  getCookie(c_name:any) {
    return localStorage.getItem(c_name);
  }

  setCookie(c_name:any, value:any, expiredays:any) {
    return localStorage.setItem(c_name, value);
  }

  dologout(){
    this.setCookie('login', false, 30);
    this.setCookie('email', '', 30);
    this.setCookie('fullname', '', 30);
    this.setCookie('id', '', 30);
    this.setCookie('loadapp_count', '', 30);    
    
    /* w3_close();
    menu_click('dangnhap');
    checklogin(); */
    
  }

  checklogin(){
    var login_cookie=this.getCookie('login');
    if(login_cookie=='true'){
      var login_success_txt='Đăng nhập thành công.';
      /* FULLNAME=getCookie('fullname');
      EMAIL=getCookie('email');
      IDUSERS=getCookie('id'); */
      var login_classdiv=this.getCookie('login_classdiv');      
    }else{
      //do bla bla bla
    }
  }

  /* $(document).ready(function(){
    // Validate form
    $("#form_dangnhap").validate({
      errorElement: "span", // Định dạng cho thẻ HTML hiện thông báo lỗi
      submitHandler: function(form) {
      
        // Validate thành công sẽ lấy dữ liệu từ form và gởi đến test.php
        //var password= $('#password').attr('value');
        var password=document.getElementById('password').value;
        //var email= $('#email').attr('value');
        var email=document.getElementById('email').value;
        //alert(password);
       
        $.ajax({
          type: "POST", // phương thức gởi đi
          url: urllogin, // nơi mà dữ liệu sẽ chuyển đến khi submit
          data: "password="+ password +"&email="+ email, // giá trị post
          success: function(answer){ // if everything goes well
            //alert(answer);					
            var user_info = JSON.parse(answer);
            //alert(user_info.login);
            if(user_info.login==true){
              //$('form#form_dangnhap').hide(); // ẩn form đi
              setCookie('login', true, 30);
              setCookie('email', user_info.email, 30);
              setCookie('fullname', user_info.fullname, 30);
              setCookie('id', user_info.id, 30);
              setCookie('login_classdiv', user_info.login_classdiv, 30);
              setCookie('loadapp_count', 0, 30);
              loadapp();
              //menu_click('thuthap');
              FULLNAME=user_info.fullname;
              EMAIL=user_info.email;
              $('#messdiv2').html('<h3>'+FULLNAME+'<br>'+EMAIL+'</h3>');
            }
            $('#messdiv').fadeIn();
            $('#messdiv2').fadeIn();
            document.getElementById('messdiv').className=user_info.login_classdiv;					
            var login_success_txt=user_info.login_mess;
            $('#messdiv').html(login_success_txt);
          }
        });
        return false;  // Form sẽ không chuyển đến trang test.php
         
       }
    });
  }); */

}
