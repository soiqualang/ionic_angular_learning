# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

`ionic start capnhap_congtrinh`

## Add libs

```bash
ionic g service services/database
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


## Add pages

> app.component.ts

## Remove a page

* Delete in `\src\app`
* Remove route in `app-routing.module.ts`

## Route view_congtrinh

Add `id` parameter

`{ path: 'view-congtrinh-thuyloi/:id', loadChildren: './pages/view-congtrinh-thuyloi/view-congtrinh-thuyloi.module#ViewCongtrinhThuyloiPageModule' }`

## Prepare Database

### Make sqlite from qgis

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






## Preferences

> Icon
https://ionicframework.com/docs/v3/ionicons/


