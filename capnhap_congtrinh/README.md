# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

`ionic start capnhap_congtrinh`

## Add libs

```bash
ionic g service services/database
ionic g service services/cong_hientrang_point
ionic g service services/dap_hientrang_point
ionic g service services/debao_hientrang_line

ionic g page pages/list_congtrinh_thuyloi
ionic g page pages/view_congtrinh_thuyloi
ionic g page pages/add_congtrinh_thuyloi
```

```bash
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite
```

```bash
ionic cordova platform add android
ionic cordova resources android --force
cordova-res.cmd android
```

add `<script src="cordova.js"></script>` to `index.html`

`ionic serve --devapp`

> http://192.168.11.129:8100

## Add pages

> app.component.ts

## Remove a page

* Delete page folders in `\src\app`
* Remove route in `app-routing.module.ts`

## Route view_congtrinh

Add `id` parameter

`{ path: 'view-congtrinh-thuyloi/:id', loadChildren: './pages/view-congtrinh-thuyloi/view-congtrinh-thuyloi.module#ViewCongtrinhThuyloiPageModule' }`

## Prepare Database

> For Spatial Data

* QGIS Make `wkt` column
* Export to SQLite with srid=4326
* Adminer open Sqlite DB, remove geomerty column, ogc_id
* Make `id` as `auto increment` (AI) column
* Export to `sql file`

> `SQL file` exported from Adminer

* Remove comment started with `--`
* Remove blank breakline
* Remove Delete, Truncate command
* Replace `CREATE TABLE` with `CREATE TABLE IF NOT EXISTS`
* Replace `INSERT INTO` with `INSERT or IGNORE INTO`

## Config

### app.module.ts

```ts
/* SQLite */
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';

....

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
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

## Flow when add new table

### database.service.ts

> Define table Object

```ts
export interface dap_hientrang_point {
  id: number,
  ten_dap: string,
  ma_loai: string,
  x: number,
  y: number,
  wkt: string
}
```

> Make 2 functions

```ts
getdap_hientrang_point(): Observable<dap_hientrang_point[]> {
  return this.congtrinh_dap_arr.asObservable();
}

loaddap_hientrang_point(){
  return this.table_to_array1('dap_hientrang_point').then(data => {
    let congtrinh_dap_arr: dap_hientrang_point[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        congtrinh_dap_arr.push(data.rows.item(i));
      }
    }
    this.congtrinh_dap_arr.next(congtrinh_dap_arr);
  });
}
```

> Call `loaddap_hientrang_point()` when app loading

```ts
processQuery(queries:any) {
  for(let i=0;i<queries.length;i++){
    if(queries[i].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
      this.runSQL(queries[i]);
    }
  }
  //console.log(queries[1]);
  //this.getTable('select ten_vi from vn_tinh');
  this.loaddap_hientrang_point();
  this.dbReady.next(true);
}
```

### list-congtrinh-thuyloi.page.ts

> Call `getdap_hientrang_point()` when Angular Init app

```ts
ngOnInit() {
  this.db.getDatabaseState().subscribe(rdy => {
    if (rdy) {
      this.db.getdap_hientrang_point().subscribe(res => {
        this.dap_hientrang_point = res;
      });
    }
  });
}
```


## Preferences

> Icon
https://ionicframework.com/docs/v3/ionicons/

> RxJS Observables | HTTP request is an asynchronous task
* https://medium.com/@zmharker/rxjs-observables-in-ionic-and-angular-apps-a-beginners-guide-181643af675e
* https://www.tiepphan.com/rxjs-reactive-programming/
* https://viblo.asia/p/xu-ly-nhieu-http-requests-trong-angular-voi-rxjs-maGK74qeZj2
* https://viblo.asia/p/tu-javascript-thuan-den-rxjs-phan-3-924lJryblPM

> Login
https://devdactic.com/ionic-4-login-angular/

> Tạo hàm đồng bộ
https://stackoverflow.com/questions/39125964/angular2-then-does-not-exist-on-type-void

> Photos
https://devdactic.com/ionic-4-image-upload-storage/

