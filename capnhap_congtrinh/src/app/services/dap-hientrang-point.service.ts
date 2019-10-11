import { Injectable } from '@angular/core';

/* SQLite */
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

import { DatabaseService  } from 'src/app/services/database.service';

export interface dap_hientrang_point {
  id: number,
  name: string,
  skills: any[],
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class DapHientrangPointService {

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(public db: DatabaseService) { }
  
  test1(){
    console.log('hahahahahaha');
    return;
  }

  getDevs(): Observable<dap_hientrang_point[]> {
    return this.developers.asObservable();
  }
 
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }


  /* loadDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let developers: dap_hientrang_point[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
 
          developers.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            skills: skills, 
            img: data.rows.item(i).img
           });
        }
      }
      this.developers.next(developers);
    });
  }
 
  addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadDevelopers();
    });
  }
 
  getDeveloper(id): Promise<dap_hientrang_point> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
      let skills = [];
      if (data.rows.item(0).skills != '') {
        skills = JSON.parse(data.rows.item(0).skills);
      }
 
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
        skills: skills, 
        img: data.rows.item(0).img
      }
    });
  }
 
  deleteDeveloper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadDevelopers();
      this.loadProducts();
    });
  }
 
  updateDeveloper(dev: dap_hientrang_point) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  }
 
  loadProducts() {
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({ 
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator,
           });
        }
      }
      this.products.next(products);
    });
  }
 
  addProduct(name, creator) {
    let data = [name, creator];
    return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.loadProducts();
    });
  } */

}
