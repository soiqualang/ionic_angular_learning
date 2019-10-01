import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';


@Injectable()
export class DatabaseProvider {


   /**
    * @name _DB
    * @type {object}
    * @private
    * @description     Defines an object for handling interfacing with the
    				           SQLite plugin
    */
   private _DB 	: SQLiteObject;




   /**
    * @name _DB_NAME
    * @type {object}
    * @private
    * @description     Defines the name of the SQLite database to be created
    */
   private _DB_NAME : string 		= "ionic.db";




   constructor(public http 		   : HttpClient,
               private _PLAT       : Platform,
   			   private _SQL        : SQLite,
   			   private _PORTER     : SQLitePorter)
   {  }




   /**
    * @public
    * @method init
    * @description          Creates the SQLite database
    * @return {none}
    */
   init() : void
   {
       // Define the application SQLite database
       this._SQL.create({
          name 		  : this._DB_NAME,
          location 	  : 'default'
       })
       .then((db: SQLiteObject) =>
       {
          // Associate the database handler object with the _DB private property
          this._DB = db;
       })
       .catch((e) =>
       {
          console.log(e);
       });
   }




   /**
    * @public
    * @method dataExistsCheck
    * @param tableName    {String}          Name of table we want to check for data
    * @description          Checks that data exists within the specified SQLite table
    * @return {Promise}
    */
   dataExistsCheck(tableName : string) : Promise
   {
      return new Promise((resolve, reject) =>
      {
         this._DB.executeSql('SELECT count(*) AS numRows FROM ' + tableName, {})
         .then((data : any) =>
         {
            var numRows = data.rows.item(0).numRows;
            resolve(numRows);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }




   /**
    * @public
    * @method retrieveAllRecords
    * @description          Retrieves all stored records from the technologies SQLite table
    * @return {Promise}
    */
   retrieveAllRecords() : Promise
   {
      return new Promise((resolve, reject) =>
      {

         this._DB.executeSql('SELECT id, name, description FROM technologies', {})
         .then((data : any) =>
         {
            let items : any 	= [];
            if(data.rows.length > 0)
            {
               var k;

               // iterate through returned records and push as nested objects into
               // the items array
               for(k = 0; k < data.rows.length; k++)
               {
                  items.push(
                  {
	                 id 			    : data.rows.item(k).id,
	                 name 			    : data.rows.item(k).name,
	                 description 	    : data.rows.item(k).description
                  });
               }
            }
            resolve(items);
         })
         .catch((error : any) =>
         {
            reject(error);
         });

      });
   }




   /**
    * @public
    * @method importSQL
    * @param sql    {String}          The SQL data to be imported
    * @description          Imports the supplied SQL data to the application database
    * @return {Promise}
    */
   importSQL(sql 	: any) : Promise
   {
      return new Promise((resolve, reject) =>
      {
         this._PORTER.importSqlToDb(this._DB, sql)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }




   /**
    * @public
    * @method exportAsSQL
    * @description          Exports SQL data from the application database
    * @return {Promise}
    */
   exportAsSQL() : Promise
   {
      return new Promise((resolve, reject) =>
      {
         this._PORTER
         .exportDbToSql(this._DB)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }




   /**
    * @public
    * @method importJSON
    * @param json    {String}          The JSON data to be imported
    * @description          Imports the supplied JSON data to the application database
    * @return {Promise}
    */
   importJSON(json : any) : Promise
   {
      return new Promise((resolve, reject) =>
      {
         this._PORTER
         .importJsonToDb(this._DB, json)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }




   /**
    * @public
    * @method clear
    * @description          Removes all tables/data from the application database
    * @return {Promise}
    */
   clear() : Promise
   {
      return new Promise((resolve, reject) =>
      {
         this._PORTER
         .wipeDb(this._DB)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((error) =>
         {
            reject(error);
         });
      });
   }


}