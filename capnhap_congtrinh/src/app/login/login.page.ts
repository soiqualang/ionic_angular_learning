import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { DatabaseService} from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';

declare var window;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  frmlogin={
    email: null,
    password: null
  };

  public window = window;

  constructor(public login:LoginService, public db:DatabaseService, private toast: ToastController) { }

  ngOnInit() {
  }

  do_login(){
    
    this.login.do_login(this.frmlogin);

    //window.islogin=true;
    //this.db.go2page('home');

  }

}
