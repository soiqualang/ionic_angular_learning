import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serv_URL='http://dev.dothanhlong.org/t1/';

  constructor(public http: HttpClient) { }

  postData(data:any,tblname:any){
    return new Promise(resolve => {
      this.http.post(this.serv_URL+'t1.php'+'?tblname='+tblname,data,{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
          resolve(res);
        })
    });
  }

}
