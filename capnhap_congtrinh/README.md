# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

`ionic start capnhap_congtrinh`

## Add libs

```bash
ionic g service services/database
ionic g page pages/congtrinh_thuyloi
ionic g page pages/chitiet_congtrinh_thuyloi
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






## Preferences

* https://www.freakyjolly.com/ionic-4-add-barcode-qr-code-scanner-encoder-ionic-4-native-plugin/

> Barcode Scanner
https://beta.ionicframework.com/docs/native/barcode-scanner#barcodescanneroptions

