# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

## Creat app
`ionic start ionic_sqlite`

Sử dụng template `sidemenu`

## SQLite

`ionic cordova platform add android`

```bash
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite
ionic cordova plugin add cordova-plugin-x-toast
npm install --save @ionic-native/toast
```

## Run app
`ionic serve`

`ionic serve --devapp`

**Cài thêm angular-devkit nếu máy yêu cầu**

`npm install --save-dev @angular-devkit/build-angular`






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

> TUT

* https://www.djamware.com/post/59c53a1280aca768e4d2b143/ionic-3-angular-4-and-sqlite-crud-offline-mobile-app
* https://www.freakyjolly.com/ionic-4-complete-sqlite-crud-tutorial-for-ionic-4-angular-applications/
