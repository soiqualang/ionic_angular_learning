import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from 'src/app/services/login.service';

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public window = window;

  public appPages = [
    {
      title: 'Truy cập nhanh',
      url: '/home',
      icon: 'home'
    }
  ];

  public quanlyDap = [
    {
      title: 'Danh sách đập',
      url: '/list-congtrinh-thuyloi',
      icon: 'list'
    },
    {
      title: 'Thêm đập',
      url: '/add-congtrinh-thuyloi',
      icon: 'add-circle'
    }
  ];

  public quanlyCong = [
    {
      title: 'Danh sách cống',
      url: '/list-cong-hientrang-point',
      icon: 'list'
    },
    {
      title: 'Thêm cống',
      url: '/add-cong-hientrang-point',
      icon: 'add-circle'
    }
  ];

  public appAuthPage=[
    {
      title: 'Đăng nhập',
      url: '/login',
      icon: 'log-in'
    }
  ];

  /* public islogin=false; */  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public login:LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //window.islogin=false;
      this.login.checklogin();
    });
  }
}
