# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

## Creat app
`ionic start ionic_form_style`

Sử dụng template `menu side`

https://ionicframework.com/docs/v3/cli/starters.html

## Run app
`ionic serve`

**Cài thêm angular-devkit nếu máy yêu cầu**

`npm install --save-dev @angular-devkit/build-angular`

## Cách truyền biến

>`(ngModel)` causes a 1-way data-binding, whereas
>`[(ngModel)]` ensures a two-way data binding.

```html
<ion-list lines="full" class="ion-no-margin ion-padding">
  <ion-item>
    <ion-label position="stacked">Chiều dài <ion-text color="danger">*</ion-text></ion-label>
    <ion-input required type="number" [(ngModel)]="chunhat.chieudai" name="chieudai"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">Chiều rộng <ion-text color="danger">*</ion-text></ion-label>
    <ion-input required type="number" [(ngModel)]="chunhat.chieurong" name="chieurong"></ion-input>
  </ion-item>

  <div class="ion-padding">
    <!-- <ion-button expand="block" type="submit" class="ion-no-margin">Tính chu vi</ion-button> -->
    <ion-button expand="block" type="button" class="ion-no-margin" (click)="chuvi_calc();">Tính chu vi</ion-button>
  </div>

  <ion-item-divider>
    <ion-label>
      <h1>{{chunhat.chuvi}}</h1>
    </ion-label>
  </ion-item-divider>
  
</ion-list>
```

```ts
export class HomePage {
  /* chieudai:any;
  chieurong:any; */

  //chunhat: hình chữ nhật
  chunhat={
    chieudai: null,
    chieurong: null,
    chuvi: null,
  };

  constructor() {}

  chuvi_calc(){
    //alert(this.chunhat);
    this.chunhat.chuvi=(eval(this.chunhat.chieudai+this.chunhat.chieurong))*2;
    console.log(this.chunhat);
  }
  
}
```

## Lưu ý:

* Các đối tượng trong form phải có thuộc tính name

## Tạo thêm page mới

`ionic generate page form_sql`

```bash
ionic generate
ionic generate page
ionic generate page contact
ionic generate component contact/form
ionic generate component login-form --change-detection=OnPush
ionic generate directive ripple --skip-import
ionic generate service api/user
```

Sau khi tạo page mới thì Ionic sẽ tự động update routing, tuy nhiên ta phải chèn link vào menu

Update mảng `appPages` trong file `app.component.ts`

```ts
public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Form - SQL',
      url: '/form-sql',
      icon: 'bookmark'
    }
  ];
```

## Add SQLite

Muốn dùng được SQLite thì phải add platform

`ionic cordova platform add android`

`ionic cordova plugin add cordova-sqlite-storage`

`npm install @ionic-native/sqlite`

Bên cạnh `sqlite`, chúng ta còn dùng thêm `SQLite Porter`

>This Cordova/Phonegap plugin can be used to import/export to/from a SQLite database using either SQL or JSON.

https://ionicframework.com/docs/native/sqlite-porter

`ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter`

`npm install @ionic-native/sqlite-porter`

### Tạo service làm việc với Database

`ionic g service services/database`

### Tạo 2 trang developers và developer

```bash
ionic g page pages/developers
ionic g page pages/developer
```

### Load sqlite module trong `app.module.ts`

Lưu ý: Để load được module SQlite thì phải chạy lại app dưới dạng:

`ionic serve --devapp`

```ts
//app.module.ts
/*load sqlite module*/
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

/*HttpClientModule dùng để load local sqlfile ban đầu*/
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SQLitePorter
  ],
  bootstrap: [AppComponent]
}
```

### Sửa routing trỏ đến 2 page mới thêm `developers` và `developer` trong file `app-routing.module.ts`

`{ path: 'developer/:id', loadChildren: './pages/developer/developer.module#DeveloperPageModule' }`

Page developer sẽ có tham số `id` được truyền vào



## Preferences

https://ionicframework.com/docs/components

https://ionicframework.com/docs/api/label

> Ionic Form
https://ionicframework.com/docs/v3/developer-resources/forms/

> Ionic gen page, services, API
https://ionicframework.com/docs/cli/commands/generate

> SQlite
https://devdactic.com/ionic-4-sqlite-queries/

>SQLite Porter
https://ionicframework.com/docs/native/sqlite-porter