import { Injectable } from '@angular/core';

/* SQLite */
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Dev {
  id: number,
  name: string,
  skills: any[],
  img: string
}

@Injectable({
  providedIn: 'root'
})

/* Wait until the platform is ready
Create the database file, which will also open it if it already exists
Fill the Database with our initial SQL data */

export class DatabaseService {

  constructor() { }
}
