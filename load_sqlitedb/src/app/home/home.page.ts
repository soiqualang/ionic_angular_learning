import { Component } from '@angular/core';

/* Add sqlite */
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
/* import { BehaviorSubject, Observable } from 'rxjs'; */
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "data.db"; // DB name
  readonly table_name:string = "vn_tinh"; // Table name
  //queries: string;
  //i: number;

  constructor(public http: HttpClient, private sqlite: SQLite, private platform: Platform,private sqlitePorter: SQLitePorter) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }  

  createDB() {
    let options = { name: this.database_name, location: 'default', createFromLocation: 1 };
    this.sqlite.create(options)
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        //alert(this.database_name+' Database Created!');
        //this.runSQL('select ten_vi from vn_tinh limit 10');
        this.seedDatabase();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  /* seedDatabase() {
    this.http.get('assets/db.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.databaseObj, sql)
        .then(_ => {
          //this.loadDevelopers();
          //this.loadProducts();
          //this.dbReady.next(true);
          this.runSQL('select ten_vi from vn_tinh limit 10');
        })
        .catch(e => console.error(e));
    });
  } */

  seedDatabase() {
    //this.http.get('assets/solieu_congtrinh.sql', { responseType: 'text'})
    this.http.get('assets/db.sql', { responseType: 'text'})
    .subscribe(sql => {
      //console.log(sql);
      this.processQuery(sql.split(';\n'));
    });
  }

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

  //processQuery(localDB, 0, response.split(';\n'), 'solieu_congtrinh');
  /* processQuery(db, i, queries, dbname) {
      if(i < queries.length -1) {
        //console.log(i +' of '+queries.length);
        if(!queries[i+1].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
          queries[i+1] = queries[i]+ ';\n' + queries[i+1];
          return this.processQuery(db, i+1, queries, dbname);
        }
        //console.log('------------>', queries[i]);
        db.transaction( function (query){ 
          query.executeSql(queries[i]+';', [], function(tx, result) {
            this.processQuery(db, i +1, queries,dbname);  
          });          
        }, function(err) { 
        //console.log("Query error in ", queries[i], err.message);                          
        this.processQuery(db, i +1, queries, dbname);   
        });
    } else {
        console.log("Done importing!");
    }
    //dongbotbl();
  } */

  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
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
}
