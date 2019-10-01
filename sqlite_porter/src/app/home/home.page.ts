import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { DatabaseProvider } from '../database.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   /**
    * @name hasData
    * @type {Boolean}
    * @public
    * @description     Flag used in the template to control display of database records
    */
   public hasData : boolean 		= false;



   /**
    * @name technologies
    * @type {object}
    * @public
    * @description     Stores all of the retrieved database table records
    */
   public technologies : any;



   /**
    * @name dataImported
    * @type {Boolean}
    * @public
    * @description     Flag used to determine whether data has been imported into the SQLite database
    */
   public dataImported : boolean 	= false;



   /**
    * @name _SQL_NAME
    * @type {String}
    * @private
    * @description     Name of the SQL file
    */
   private _SQL_NAME : string 		= 'technologies.sql';



   /**
    * @name _SQL_URI
    * @type {String}
    * @private
    * @description     Location of the SQL file
    */
   private _SQL_URI : string 		= encodeURI("http://REMOTE-URI-HERE/technologies.sql");



   /**
    * @name _JSON_NAME
    * @type {String}
    * @private
    * @description     Name of the JSON file
    */
   private _JSON_NAME : string 		= 'technologies.json';



   /**
    * @name _JSON_URI
    * @type {String}
    * @private
    * @description     Location of the JSON file
    */
   private _JSON_URI : string 		= encodeURI("http://REMOTE-URI-HERE/technologies.json");




   /**
    * @name _REMOTE_URI
    * @type {String}
    * @private
    * @description     The address of the remote PHP script
    */
   private _REMOTE_URI : string		= "http://REMOTE-URI-HERE/parse-data.php";




   constructor(public navCtrl 	: NavController,
               private _ALERT   : AlertController,
               private _HTTP    : HttpClient,
   			   private _DB    	: DatabaseProvider,
   			   private _PLAT    : Platform)
   { }




   /**
    * @public
    * @method ionViewDidLoad
    * @description         Check whether data exists on template view load
    * @return {none}
    */
   ionViewDidLoad() : void
   {
      this._PLAT
      .ready()
      .then(() =>
      {
         setTimeout(() =>
         {
            this._DB
            .dataExistsCheck('technologies')
            .then((data) =>
            {
               this.loadRecords();
            })
            .catch((error) =>
            {
               console.dir(error);
            });
         }, 1500);
      });
   }




   /**
    * @public
    * @method loadRecords
    * @description         Retrieve records from database and, on success, set hasData flag to true
    * @return {none}
    */
   loadRecords() : void
   {
      this._DB
      .retrieveAllRecords()
      .then((data : any) =>
      {
         this.hasData 		= true;
         this.technologies 	= data;
      })
      .catch((error : any) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method import
    * @description         Display an alert window allowing the user to select their import type
    * @return {none}
    */
   import() : void
   {
      this._DB
      .dataExistsCheck('technologies')
      .then((data : any) =>
      {
         // If we have existing data then wipe the database
         if(data > 0)
         {
            this._DB
            .clear()
            .then((data) =>
            {
               // If database successfully wiped of tables/data call the importAlert method
               this.hasData = false;
               this.importAlert();
            })
            .catch((error) =>
            {
               console.dir(error);
            });
         }
         // If we don't have existing data just call the importAlert method
         else
         {
            this.importAlert();
         }
      })
      .catch((error) =>
      {
         this.importAlert();
      });
   }




   /**
    * @public
    * @method retrieveSQLFile
    * @description         Retrieve remote SQL file using Angular HttpClient get method
    * @return {none}
    */
   retrieveSQLFile() : void
   {
      this._HTTP
      .get(this._SQL_URI, {responseType: 'text'})
      .subscribe((data) =>
      {
         this.importSQL(data);
      },
      (error) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method retrieveJSONFile
    * @description         Retrieve remote JSON file using Angular HttpClient get method
    * @return {none}
    */
   retrieveJSONFile() : void
   {
      this._HTTP
      .get(this._JSON_URI)
      .subscribe((data) =>
      {
         this.importJSON(data);
      },
      (error) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method importSQL
    * @param sqlFile     {any}      The SQL file data to be imported
    * @description         Import SQL file
    * @return {none}
    */
   importSQL(sqlFile 	: any) : void
   {
      this._DB
      .importSQL(sqlFile)
      .then((res) =>
      {
         this.dataImported = true;
         this.loadRecords();
      })
      .catch((error) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method importJSON
    * @param jsonFile     {any}      The JSON file data to be imported
    * @description         Import JSON file
    * @return {none}
    */
   importJSON(jsonFile  : any) : void
   {
      this._DB
      .importJSON(jsonFile)
      .then((res) =>
      {
         this.dataImported = true;
         this.loadRecords();
      })
      .catch((error) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method importAlert
    * @description         Display an Alert Window allowing the user to select their data import type: SQL or JSON
    * @return {none}
    */
   importAlert() : void
   {
      let alert : any = this._ALERT.create({
         title 		: 'Import data',
         subTitle 	: 'Please select which import option you prefer',
         buttons 	: [
            {
            	text 		: 'JSON',
            	handler 	: () =>
            	{
            	   this.retrieveJSONFile();
            	}
            },
            {
            	text 		: 'SQL',
            	handler 	: () =>
            	{
            	   this.retrieveSQLFile();
            	}
            }
         ]
      });
      alert.present();
   }




   /**
    * @public
    * @method exportAlert
    * @description         Display an Alert Window allowing the user to select their data export type: currently only SQL
    * @return {none}
    */
   exportAlert() : void
   {
      let alert : any = this._ALERT.create({
         title 		: 'Export data',
         subTitle 	: 'Please select which export option you prefer',
         buttons 	: [
            {
            	text 		: 'SQL',
            	handler 	: () =>
            	{
            	   this.exportToSQL();
            	}
            }
         ]
      });
      alert.present();
   }




   /**
    * @public
    * @method exportToSQL
    * @description         Handles the export of SQL data using the DatabaseProvider service
    * @return {none}
    */
   exportToSQL() : void
   {
      this._DB
      .exportAsSQL()
      .then((res) =>
      {
         let fileName : any 		= Date.now() + '.sql';
         this.parseAndUploadSQL(fileName, res);
      })
      .catch((error) =>
      {
         console.dir(error);
      });
   }




   /**
    * @public
    * @method parseAndUploadSQL
    * @param fileName     {String}      The file name for the exported SQL data
    * @param fileName     {String}      The exported SQL data
    * @description        Posts the exported SQL data to the remote PHP script using Angular's HttpClient module
    * @return {none}
    */
   parseAndUploadSQL(fileName : string, sqlData : any)
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/octet-stream' }),
          options 	: any		= { "name" : fileName, "data" : sqlData };

      this._HTTP
      .post(this._REMOTE_URI, JSON.stringify(options), headers)
      .subscribe((res : any) =>
      {
         console.dir(res);
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }


}