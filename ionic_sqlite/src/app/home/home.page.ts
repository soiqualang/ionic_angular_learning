import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "t1.db"; // DB name
  readonly table_name:string = "t1_table"; // Table name
  //public storage: SQLite;
  //public itemList: Array<Object>;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('t1.db Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  /* openDB(){
    //this.storage = new SQLite();
    this.databaseObj.openDatabase({ name: "data.db", location: 'default', createFromLocation: 1 }).then((success) => {
        this.databaseObj.executeSql("SELECT * FROM art", {}).then((data) => {
              let rows = data.rows;
              for (let i = 0; i < rows.length; i++) {
                  this.row_data.push({
                      id: rows.item(i).id
                  });
              }
          }, (error) => {
            console.info("Unable to execute sql " + JSON.stringify(error));
        })
    }, (err) => {
        console.info("Error opening database: " + err);
    });
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

  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  insertRow() {
    if (!this.name_model.length) {
      alert("Enter Name");
      return;
    }
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
      .then(() => {
        alert('Row Inserted!');
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  deleteRow(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

}
