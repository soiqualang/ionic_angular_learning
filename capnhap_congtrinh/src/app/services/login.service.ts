import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService} from 'src/app/services/database.service';

declare var window;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  serv_URL='http://dev.dothanhlong.org/t1/';
  urllogin='http://dev.dothanhlong.org/t1/login.php';
  /* urlpost='http://thuyloibentre.com/services/save.php';
  urlsyn='http://thuyloibentre.com/services/syn.php';
  urllogin='http://thuyloibentre.com/services/login.php'; */

  /* user_info={
    email: null,
    fullname: null,
    tenphongban: null,
    id: null,
    login: null,
    login_mess: null
  }; */
  user_info:any;

  public window = window;

  constructor(public http: HttpClient,public db:DatabaseService) { }

  do_login(data:any){
    //console.table(data);
    this.http.post(this.urllogin,data,{
      headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    }).subscribe(user_info => {
      console.table(user_info);
      this.user_info=user_info;
      if(this.user_info.login==true){
        this.setCookie('login', true, 30);
        this.setCookie('email', this.user_info.email, 30);
        this.setCookie('fullname', this.user_info.fullname, 30);
        this.setCookie('tenphongban', this.user_info.tenphongban, 30);
        this.setCookie('id', this.user_info.id, 30);

        window.islogin=true;
        window.login_mess='';
        this.db.go2page('home');
      }else{
        window.login_mess=this.user_info.login_mess;
      }
    });
  }

  do_logout(){
    this.setCookie('login', false, 30);
    this.setCookie('email', '', 30);
    this.setCookie('fullname', '', 30);
    this.setCookie('id', '', 30);
    this.setCookie('tenphongban', '', 30);

    window.islogin=false;
    this.db.go2page('login');
    
    /* w3_close();
    menu_click('dangnhap');
    checklogin(); */
    
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

  

  checklogin(){
    var login_cookie=this.getCookie('login');
    if(login_cookie=='true'){
      window.islogin=true;
      this.db.go2page('home');
    }else{
      window.islogin=false;
      this.db.go2page('login');
    }
  }

}
