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
      title: 'Thống kê chung',
      url: '/home',
      icon: 'home'
    }/* ,
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    } */,
    {
      title: 'Danh sách công trình',
      url: '/list-congtrinh-thuyloi',
      icon: 'pin'
    },
    {
      title: 'Thêm công trinh',
      url: '/add-congtrinh-thuyloi',
      icon: 'hammer'
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
