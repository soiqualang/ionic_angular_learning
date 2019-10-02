import { Component } from '@angular/core';

/* Add sqlite */
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
/* import { BehaviorSubject, Observable } from 'rxjs'; */
import { HttpClient } from '@angular/common/http';

/* import SQL from "../../../www/sql.js"; */


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private dbName : string; 

  constructor(public http: HttpClient, private sqlite: SQLite, private platform: Platform) {

    /* this.dbName = "db.sqlite3";
    this.executeQuery("select * from vn_tinh"); */
  }

  /* getAllProducts(){

    return new Promise<Product[]>((resolve, reject) => { 
  
      let sql = "select * from Products";
      this.executeQuery(sql).then(data => {
        
        let products = [];
        data.forEach(function (row) {
          let product: Product = { productId: row[0], productName: row[1], price: row[2] }
          products.push(product);
        });
        resolve(products);
  
      }).catch(error => {
        console.log(error);
      });
  
    });
  
    
  } */
  
  /* executeQuery(sql: string) {
  
    let db: any;
    return new Promise<any>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.dbName, true);
        xhr.responseType = 'arraybuffer';
  
        xhr.onload = (e) => {
          let uInt8Array = new Uint8Array(xhr.response);
          db = new SQL.Database(uInt8Array);
          let contents = db.exec(sql);
          resolve(contents[0].values);
        };
        xhr.send();
  
    });

  } */

  
}
