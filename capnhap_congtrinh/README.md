# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

> Android SDK Window

`C:\Users\soiqu\AppData\Local\Android\Sdk`

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

## Add photo capture function

### Add libs
```bash
# Ionic Native Packages
npm i @ionic-native/camera@beta
npm i @ionic-native/file@beta
npm i @ionic-native/ionic-webview@beta
npm i @ionic-native/file-path@beta
 
# Cordova Packages
ionic cordova plugin add cordova-plugin-camera
ionic cordova plugin add cordova-plugin-file
ionic cordova plugin add cordova-plugin-ionic-webview
ionic cordova plugin add cordova-sqlite-storage
ionic cordova plugin add cordova-plugin-filepath
```

### Add photo service

`ionic g service services/photo`
`ionic g page pages/hinhanh_congtrinh`


## View image

`npm install --save ionic-img-viewer`

```bash
ionic cordova plugin add com-sarriaroman-photoviewer
npm install --save @ionic-native/photo-viewer@4
```


Lam tiep phan hinh anh

`hinhanh-congtrinh.page.ts`

```json
[{
		"rows": {
			"id": 5,
			"img": "hahahahahah",
			"takedate": "2019/10/16",
			"id_congtrinh": 26,
			"tbl_name": "congtrinh_dap"
		}
	}, {
		"rows": {
			"id": 4,
			"img": "hohohoho",
			"takedate": "2019/10/16",
			"id_congtrinh": 26,
			"tbl_name": "congtrinh_dap"
		}
	}
]
```

Khi xóa công trình thì phải xóa ảnh trước, tránh để nhiều nặng máy =))

> ionic Fetch is unavailable so cordova-plugin-ionic has been disabled

npm install whatwg-fetch --save

## Map to Modal

`ionic g page map-modal`

> app.module.ts

`import { MapModalPageModule } from './map-modal/map-modal.module';`
```ts
....
imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MapModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
....
```

> view-congtrinh-thuyloi.page.ts

```ts
import { ModalController } from '@ionic/angular';
//Lưu ý chỗ này import page chứ không phải module như bên trên nhé!
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

...

constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService,public modalController: ModalController) { }

//Hàm gọi modal ra
async openModal() {
    /* alert('hahaha'); */
    const modal = await this.modalController.create({
      component: MapModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

```

> view-congtrinh-thuyloi.page.html

```html
<div class="ion-padding">
  <h2>Click button to open modal</h2>
</div>

<ion-button (click)="openModal()">Open Modal</ion-button>

<p *ngIf="dataReturned">{{dataReturned}}</p>
```

> map-modal.page.ts

```ts
import { ModalController, NavParams } from '@ionic/angular';
...
constructor(private modalController: ModalController,private navParams: NavParams) { }
...
ngOnInit() {
  console.table(this.navParams);
  this.modelId = this.navParams.data.paramID;
  this.modalTitle = this.navParams.data.paramTitle;
}

async closeModal() {
  const onClosedData: string = "Wrapped Up!";
  await this.modalController.dismiss(onClosedData);
}
```

> map-modal.page.html

```html
<ion-header>
  <ion-toolbar class="ion-text-center">
    <ion-title>map-modal</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-grid>
    <ion-row>
      <ion-col class="ion-text-center">
        ID : {{modelId}}
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col class="ion-text-center">
        <ion-button (click)="closeModal()">Close Modal</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>

```

### Build map model services

`ionic g service services/modal`

=> Hiện tại bị fail, không thể get back giá trị về khi dismiss bên modal services @@

https://www.freakyjolly.com/ionic-4-how-to-use-ionic-modal-popovers-and-pass-data-and-receive-response/#more-1885

## Ionic Geolocation

> `cordova-plugin-android-permissions`: Get permissions by showing the permission dialogue. We will use this plugin to get Geolocation access permission, but this can be used for any type of permission.

```bash
$ ionic cordova plugin add cordova-plugin-android-permissions
$ npm install @ionic-native/android-permissions
```

> Geolocation packages
> `cordova-plugin-request-location-accuracy`: Shows a dialogue to the user to turn on GPS we show in the image below so that the user does not need to leave the app or go to setting.

```bash
$ ionic cordova plugin add cordova-plugin-request-location-accuracy
$ npm install @ionic-native/location-accuracy
```

> `cordova-plugin-geolocation`: Finally after getting location access permission and turning on device GPS, we will fetch accurate device Geolocation coordinates using this Geolocation plugin.

```bash
$ ionic cordova plugin add cordova-plugin-geolocation
$ npm install @ionic-native/geolocation
```

> app.module.ts

```ts
/* Geolocation */
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
...
providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    Camera,
    File,
    WebView,
    FilePath,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy
  ],
```

`ionic cordova run android -l -c`

**Test trên máy android ảo (ADV) thì fail, máy thật thì ok @@**

## Leaflet

https://www.javascripttuts.com/using-leaflet-open-street-map-in-an-ionic-application-in-one-go/

> index.html

`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />`

`npm install leaflet`

`npm install @types/leaflet`

> map-modal.page.html

`<div id="map" style="height:100%;"></div>`






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

> Image viewer
https://www.npmjs.com/package/ionic-img-viewer

https://ionicacademy.com/ionic-4-image-gallery-zoom/

> Date
https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript


> Modal
http://www.freakyjolly.com/ionic-3-add-modals-in-ionic-3-application-using-latest-ionic-cli-v4-12-0/

https://www.freakyjolly.com/ionic-4-how-to-use-ionic-modal-popovers-and-pass-data-and-receive-response/#more-1885

> Geolocation

https://www.freakyjolly.com/ionic-4-turn-on-device-gps-in-ionic-4-application-without-leaving-app-using-ionic-native-plugin/

> Bat dong bo
https://www.freecodecamp.org/news/javascript-from-callbacks-to-async-await-1cc090ddad99/

> Leaflet
https://edupala.com/how-to-add-leaflet-map-in-ionic-4/

https://www.javascripttuts.com/using-leaflet-open-street-map-in-an-ionic-application-in-one-go/