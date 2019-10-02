# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

## prepopulated DB

> Không đọc từ một database được chuẩn bị trước được @@!

=> Fail!

```bash
npm install -g sqlite3 
sqlite3 -csv -header database_name.db "SELECT * FROM table_name" > data.csv
sqlite3 -csv -header data.db "SELECT * FROM vn_tinh" > vn_tinh.csv

npm install -g csvtojson
csvtojson data.csv > data.json
csvtojson vn_tinh.csv > vn_tinh.json
```
https://forum.ionicframework.com/t/prepopulated-sqlite-databases-in-ionic-2/56721/2


## Import from file SQL

> SQLite Porter plugin 
> Ionic DevApp only supports a selective set of native plugins of which this plugin is not one of them.
> If you wish to use this plugin, you need to do a full native build of the iOS app using Ionic/Cordova.

=> Fail!

Tự viết hàm và tada... Ok! :v

```ts
processQuery(queries:any) {
    for(let i=0;i<queries.length;i++){
      if(queries[i].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        //queries[i+1] = queries[i]+ ';\n' + queries[i+1];
        //console.log('------------>', queries[i]);
        this.runSQL(queries[i]);
      }
    }
    //console.log(queries[1]);
    this.getSQL('select ten_vi from vn_tinh limit 10');
  }
runSQL(sql:string){
    this.databaseObj.executeSql(sql, [])
      .then((res) => {
        //lert("query ok")
        console.log('query ok')
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

getSQL(sql:string){
this.databaseObj.executeSql(sql, [])
    .then((res) => {
    this.row_data = [];
    if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
        this.row_data.push(res.rows.item(i));
        }
    }
    console.log(this.row_data);
    })
    .catch(e => {
    alert("error " + JSON.stringify(e))
    });
}
```

## Import from JSON





`npm i -g native-run`

`ionic cordova run android`

`ionic cordova run ios`

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

> Plugin support on devapp
https://ionicframework.com/docs/appflow/devapp/#native-cordova-plugin-support