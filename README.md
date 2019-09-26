# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

## Install

`npm install -g ionic cordova`
```bash
C:\Users\soiqu\AppData\Roaming\npm\cordova -> C:\Users\soiqu\AppData\Roaming\npm\node_modules\cordova\bin\cordova
C:\Users\soiqu\AppData\Roaming\npm\ionic -> C:\Users\soiqu\AppData\Roaming\npm\node_modules\ionic\bin\ionic
+ cordova@9.0.0
+ ionic@5.4.1
```

## Creat app
`ionic start photo-gallery tabs`

Sử dụng template `tabs`

https://ionicframework.com/docs/v3/cli/starters.html

## Run app
`ionic serve`

## Add platform (Android/IOS)

https://ionicframework.com/docs/angular/your-first-app/ios-android-camera

Muốn sử dụng được các thành phần phần cứng của thiết bị thì phải add platform tương ứng vào.

```bash
ionic cordova platform add ios
ionic cordova platform add android
```

```bash
[WARN] cordova-res was not found on your PATH. Please install it globally:

       npm i -g cordova-res

[WARN] Cannot generate resources without cordova-res installed.

       Once installed, you can generate resources with the following command:

       ionic cordova resources android --force
```

### Start Services (again)
`ionic serve --devapp`

Cài đặt App `Ionic DevApp` trên điện thoại

Truy cập để test các chức năng native của thiết bị như camera, gps, file,...

## Add the Camera Dependencies via the CLI
`npm install @ionic-native/camera`

**add the native iOS and Android code**

`ionic cordova plugin add cordova-plugin-camera`

### Các nước add camera vô app

#### Add Camera plugin to Angular App Module `src/app/app.module.ts`

```ts
import { Camera } from '@ionic-native/camera/ngx';
providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
```

#### Add the Camera to the Gallery page `tab2.page.html`

```html
<!--tab2.page.html-->

<img [src]="currentImage" *ngIf="currentImage">

<ion-fab vertical="bottom" horizontal="center" slot="fixed">
  <ion-fab-button (click)="takePicture()">
    <ion-icon name="camera"></ion-icon>
  </ion-fab-button>
</ion-fab>
```
#### Add function take photo `tab2.page.ts`

```ts
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
export class Tab2Page {
  currentImage: any;
  constructor(private camera: Camera) {}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

}
```

## Save photo to device

### Make photo service
`ionic g service services/Photo`

Khi khai báo hàm trong services thì để gọi ra, chúng ta cần khai báo service đó, rồi gọi `[tên services].[tên hàm]`. Ví dụ:

**Khai báo services:**
```ts
export class Tab2Page {
  constructor(public photoService: PhotoService) {}  

}
```
**Gọi hàm trong services**

`<ion-col size="6" *ngFor="let photo of photoService.photos">`


### Use SQLite

#### Add sqlite storage

**Install**

`ionic cordova plugin add cordova-sqlite-storage`

**Add to js core**

`npm install --save @ionic/storage`

**Add lib to `app.module.ts`**

```ts
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**Add to service `photo.service.ts`**
`import { Storage } from '@ionic/storage';`

```ts
//Save
this.storage.set('photos', this.photos);

//Select
this.storage.get('photos').then((photos) => {
  this.photos = photos || [];
});
```


## Build App Android

`cordova build android`

```bash
Built the following apk(s):
        D:\sync\websvr\xampp\ionic_angular_learning\photo-gallery\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

## Preferences

> My repo when I learning Angular
https://github.com/soiqualang/Learn_AngularJS

> Ionic Docs
* https://ionicframework.com/docs/intro
* https://ionicframework.com/docs/angular/your-first-app

> Icon Ionic
https://ionicframework.com/docs/v3/ionicons/

> Các kiểu button (icon)
https://ionicframework.com/docs/api/fab

> SQLite plugin
https://ionicframework.com/docs/building/storage

