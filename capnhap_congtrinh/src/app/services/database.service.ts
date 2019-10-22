import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

/* SQLite */
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

/* import { DapHientrangPointService  } from 'src/app/services/dap-hientrang-point.service'; */

export interface dap_hientrang_point {
  id: number,
  ten_dap: string,
  ma_loai: string,
  x: number,
  y: number,
  wkt: string
}

export interface cong_hientrang_point {
  id: number,
  ghichu_ten: string,
  maso_cong: string,
  ghichu_kiemtra: string,
  x: number,
  y: number,
  wkt: string
}

export interface hinhanh {
  id: number,
  img: string,
  takedate: string,
  id_congtrinh: number,
  tbl_name: string
}

@Injectable({
  providedIn: 'root'
})

/* Wait until the platform is ready
Create the database file, which will also open it if it already exists
Fill the Database with our initial SQL data */

export class DatabaseService {

  public database: SQLiteObject;
  public database_name:string = "congtrinh_v1.db";
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  congtrinh_dap_arr = new BehaviorSubject([]);
  congtrinh_cong_arr = new BehaviorSubject([]);
  hinhanh_arr = new BehaviorSubject([]);

  constructor(public plt: Platform, public sqlite: SQLite, public http: HttpClient,private route: ActivatedRoute,private router: Router) {
    this.plt.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }

  createDB() {
    let options = { name: this.database_name, location: 'default', createFromLocation: 1 };
    this.sqlite.create(options)
      .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }
  
  seedDatabase() {
    this.http.get('assets/sql/congtrinh.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.processQuery(sql.split(';\n'));
    });
  }

  processQuery(queries:any) {
    for(let i=0;i<queries.length;i++){
      if(queries[i].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        this.runSQL(queries[i]);
      }
    }
    //console.log(queries[1]);
    //this.getTable('select ten_vi from vn_tinh');
    this.loaddap_hientrang_point();
    this.loadhinhanh();
    this.loadcong_hientrang_point();
    this.dbReady.next(true);
  }

  runSQL(sql:string){
    return this.database.executeSql(sql, [])
      .then((res) => {
        //lert("query ok");
        //console.log('query ok');
        return res;
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

 
  getDatabaseState() {
    return this.dbReady.asObservable();
  } 
  
  test1(){
    console.log('hahahahahaha');
    return;
  }
  
  checknumerric(num){
    if(!isNaN(num)){
      return num;
    }else if(num==null){
      return 'null';
    }else if(num==''){
      return 'null';
    }else{
      return "'"+num+"'";
    }
  }

  /* 
  dap_hientrang_point 
  */

  getdap_hientrang_point(): Observable<dap_hientrang_point[]> {
    return this.congtrinh_dap_arr.asObservable();
  }

  loaddap_hientrang_point(){
    return this.table_to_array_order('dap_hientrang_point','ten_dap','ASC').then(data => {
      let congtrinh_dap_arr: dap_hientrang_point[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          congtrinh_dap_arr.push(data.rows.item(i));
        }
      }
      this.congtrinh_dap_arr.next(congtrinh_dap_arr);
    });
  }

  /* 
  cong_hientrang_point 
  */
  
  getcong_hientrang_point(): Observable<cong_hientrang_point[]> {
  return this.congtrinh_cong_arr.asObservable();
  }

  loadcong_hientrang_point(){
    return this.table_to_array_order('cong_hientrang_point','ghichu_ten','ASC').then(data => {
      let congtrinh_cong_arr: cong_hientrang_point[] = [];
      //alert(data.rows.length);
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          congtrinh_cong_arr.push(data.rows.item(i));
        }
      }
      this.congtrinh_cong_arr.next(congtrinh_cong_arr);
    });
  }

  /* Hinh anh */
  gethinhanh(): Observable<hinhanh[]> {
    return this.hinhanh_arr.asObservable();
  }

  loadhinhanh(){
    return this.table_to_array1('hinhanh').then(data => {
      let hinhanh_arr: hinhanh[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          hinhanh_arr.push(data.rows.item(i));
        }
      }
      this.hinhanh_arr.next(hinhanh_arr);
    });
  }




  loaddap_hientrang_point_old() {
    return this.database.executeSql('SELECT * FROM dap_hientrang_point', []).then(data => {
      let congtrinh_dap_arr: dap_hientrang_point[] = [];

      console.log(data.rows.item(0));

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          congtrinh_dap_arr.push(data.rows.item(i));
        }
      }
      
      //console.log(Object.keys(congtrinh_dap_arr[0])[0]);

      /* for(let i in congtrinh_dap_arr){
        console.log(i); // alerts key
        console.log(congtrinh_dap_arr[i]); //alerts key's value
      } */

      //console.log(data.rows.length);
      /* if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) { 
          congtrinh_dap_arr.push({ 
            id: data.rows.item(i).id,
            ten_dap: data.rows.item(i).ten_dap, 
            ma_loai: data.rows.item(i).ma_loai, 
            x: data.rows.item(i).x, 
            y: data.rows.item(i).y, 
            wkt: data.rows.item(i).wkt
           });
        }
      } */
      this.congtrinh_dap_arr.next(congtrinh_dap_arr);
    });
  }

  table_to_array1(table){
    return this.database.executeSql('SELECT * FROM '+table, []).then(data => {
      return data;
    });
  }

  table_to_array_order(table,orcol='id',opt='ASC'){
    return this.database.executeSql('SELECT * FROM '+table+' ORDER BY '+orcol+' '+opt+'', []).then(data => {
      return data;
    });
  }

  table_to_arraywhere(table,colum,value){
    /* let sql="SELECT * from "+table+" where "+colum+" = '"+value+"' order by id desc";
    console.log(sql);
    return Promise.resolve(this.runSQL(sql)); */
    let sql='SELECT * FROM '+table+' WHERE '+colum+' = ?';
    return this.database.executeSql(sql, [value]).then(data => {
      /* return {
        id: data.rows.item(0).id,
        ten_dap: data.rows.item(0).ten_dap, 
        ma_loai: data.rows.item(0).ma_loai, 
        x: data.rows.item(0).x, 
        y: data.rows.item(0).y, 
        wkt: data.rows.item(0).wkt
      } */
      return data;
    });
  }

  table_to_array_2dk(table,col1,val1,col2,val2){
    /* let sql="SELECT * from "+table+" where "+colum+" = '"+value+"' order by id desc";
    console.log(sql);
    return Promise.resolve(this.runSQL(sql)); */
    let sql='SELECT * FROM "'+table+'" WHERE "'+col1+'" = ? AND "'+col2+'" = ?';
    return this.database.executeSql(sql, [val1,val2]).then(data => {
      /* return {
        id: data.rows.item(0).id,
        ten_dap: data.rows.item(0).ten_dap, 
        ma_loai: data.rows.item(0).ma_loai, 
        x: data.rows.item(0).x, 
        y: data.rows.item(0).y, 
        wkt: data.rows.item(0).wkt
      } */
      return data;
    });
  }

  update_table(table,field,value,dk1,gt_dk1){
    let strupdate="";
    let i=0;
    for(i; i<field.length-1; i++){
      strupdate+=field[i]+"="+this.checknumerric(value[i])+", ";
    }
    strupdate+=field[i]+"="+this.checknumerric(value[i]);
    let sql_add_news="UPDATE "+table+" SET "+strupdate+" WHERE "+dk1+"='"+gt_dk1+"'";
    /* console.log(sql_add_news); */
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  insert_table(table,field,value){
    let strfield="";
    let strvalue="";
    let i=0;
    for(i; i<field.length-1; i++)
    {
      strfield+=field[i]+", ";
      strvalue+="'"+value[i]+"', ";
      
    }
    strfield+=field[i];
    strvalue+="'"+value[i]+"'";
    let sql_add_news="INSERT INTO "+table+"("+strfield+") VALUES ("+strvalue+")";
    /* console.log(sql_add_news); */
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  delete(table,where,id) {
    return this.database.executeSql('DELETE FROM '+table+' WHERE '+where+' = ?', [id]).then(_ => {
    });
  }

  makefid(){
    let ran_num=Math.random().toString();
    let cur_date=new Date().toISOString();
    let hash=Md5.hashStr(ran_num+cur_date);
    //alert(hash);
    return hash;
  }

  go2page(page) {
    this.router.navigateByUrl('/'+page);
  }
 



  
  /* addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadDevelopers();
    });
  }
 
  getDeveloper(id): Promise<Dev> {
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
 
  updateDeveloper(dev: Dev) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  } */
}