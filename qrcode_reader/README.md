# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

`ionic start qrcode_reader`

## Add libs

```bash
ionic g service services/database
ionic g page pages/developers
ionic g page pages/developer
```

```bash
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
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

