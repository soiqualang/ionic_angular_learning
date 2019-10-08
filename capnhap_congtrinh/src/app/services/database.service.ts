import { Injectable } from '@angular/core';

/* SQLite */
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

/* import { DapHientrangPointService  } from 'src/app/services/dap-hientrang-point.service'; */

export interface dap_hientrang_point {
  id: number,
  ten_dap: string,
  ma_loai: string,
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

  constructor(public plt: Platform, public sqlite: SQLite, public http: HttpClient) {
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
    this.test1();
    this.dbReady.next(true);
  }

  runSQL(sql:string){
    return this.database.executeSql(sql, [])
      .then((res) => {
        //lert("query ok");
        //console.log('query ok');
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

  /* 
  dap_hientrang_point 
  */

  getdap_hientrang_point(): Observable<dap_hientrang_point[]> {
    return this.congtrinh_dap_arr.asObservable();
  }

  loaddap_hientrang_point() {
    return this.database.executeSql('SELECT * FROM dap_hientrang_point', []).then(data => {
      let congtrinh_dap_arr: dap_hientrang_point[] = [];
      
      //console.log(data.rows.length);
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          /* let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          } */
 
          congtrinh_dap_arr.push({ 
            id: data.rows.item(i).id,
            ten_dap: data.rows.item(i).ten_dap, 
            ma_loai: data.rows.item(i).ma_loai, 
            x: data.rows.item(i).x, 
            y: data.rows.item(i).y, 
            wkt: data.rows.item(i).wkt
           });
        }
      }
      this.congtrinh_dap_arr.next(congtrinh_dap_arr);
    });
  }

  getcongtrinh_dap(id): Promise<dap_hientrang_point> {
    return this.database.executeSql('SELECT * FROM dap_hientrang_point WHERE id = ?', [id]).then(data => {
       
      return {
        id: data.rows.item(0).id,
        ten_dap: data.rows.item(0).ten_dap, 
        ma_loai: data.rows.item(0).ma_loai, 
        x: data.rows.item(0).x, 
        y: data.rows.item(0).y, 
        wkt: data.rows.item(0).wkt
      }
    });
  }

  table_to_arraywhere(table,colum,value){
    /* let sql="SELECT * from "+table+" where "+colum+" = '"+value+"' order by id desc";
    console.log(sql);
    return Promise.resolve(this.runSQL(sql)); */

    return this.database.executeSql('SELECT * FROM '+table+' WHERE '+colum+' = ?', [value]).then(data => {
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


  updatecongtrinh_dap(dap_hientrang_point: dap_hientrang_point) {
    let data = [dap_hientrang_point.ten_dap, dap_hientrang_point.ma_loai, dap_hientrang_point.x, dap_hientrang_point.y, dap_hientrang_point.wkt];
    return this.database.executeSql(`UPDATE dap_hientrang_point SET ten_dap = ?, ma_loai = ?, x = ?, y = ?, wkt = ? WHERE id = ${dap_hientrang_point.id}`, data).then(data => {
      this.loaddap_hientrang_point();
    })
  }

  checknumerric(num){
    if(!isNaN(num)){
      return num;
    }else if(num==null){
      return 'null';
    }else{
      return "'"+num+"'";
    }
  }

  update_table(table,field,value,dk1,gt_dk1){
    let strupdate="";
    let i=0;
    for(i; i<field.length-1; i++){
      strupdate+=field[i]+"="+this.checknumerric(value[i])+", ";
    }
    strupdate+=field[i]+"="+this.checknumerric(value[i]);
    let sql_add_news="UPDATE "+table+" SET "+strupdate+" WHERE "+dk1+"='"+gt_dk1+"'";
    console.log(sql_add_news);
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
    console.log(sql_add_news);
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  delete(table,where,id) {
    return this.database.executeSql('DELETE FROM '+table+' WHERE '+where+' = ?', [id]).then(_ => {
    });
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