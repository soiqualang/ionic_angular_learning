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



## Preferences

> My repo when I learning Angular
https://github.com/soiqualang/Learn_AngularJS

> Ionic Docs
* https://ionicframework.com/docs/intro
* https://ionicframework.com/docs/angular/your-first-app

> Icon Ionic
https://ionicframework.com/docs/v3/ionicons/
