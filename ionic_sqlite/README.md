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

add `<script src="cordova.js"></script>` to `index.html`

## Run app
`ionic serve`

`ionic serve --devapp`

**Cài thêm angular-devkit nếu máy yêu cầu**

`npm install --save-dev @angular-devkit/build-angular`

## Spatial SQlite

```bash
select HEX("GEOMETRY") from vn_tinh
limit 10
```


## Preferences

> TUT

* https://www.djamware.com/post/59c53a1280aca768e4d2b143/ionic-3-angular-4-and-sqlite-crud-offline-mobile-app
* https://www.freakyjolly.com/ionic-4-complete-sqlite-crud-tutorial-for-ionic-4-angular-applications/

> SQlite
https://www.thepolyglotdeveloper.com/2015/01/deploy-ionic-framework-app-pre-filled-sqlite-db/

> Spatial SQLite
* https://www.gaia-gis.it/gaia-sins/spatialite-tutorial-2.3.1.html
* https://www.gaia-gis.it/gaia-sins/spatialite-sql-4.3.0.html
* https://www.gaia-gis.it/gaia-sins/spatialite-sql-4.3.0.html#p3
* http://www.gaia-gis.it/gaia-sins/spatialite-sql-latest.html
* http://yeesian.com/ArchGDAL.jl/latest/spatialite.html
* http://www.gaia-gis.it/gaia-sins/spatialite-cookbook/html/php.html
* https://github.com/DisyInformationssysteme/Cordova-spatialite-storage