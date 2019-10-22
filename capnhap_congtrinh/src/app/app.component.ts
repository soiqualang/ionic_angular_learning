import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Truy cập nhanh',
      url: '/home',
      icon: 'home'
    }/* ,
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    } */,
    {
      title: 'Công trình đập',
      url: '/list-congtrinh-thuyloi',
      icon: 'list'
    },
    {
      title: 'Thêm đập',
      url: '/add-congtrinh-thuyloi',
      icon: 'add-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
