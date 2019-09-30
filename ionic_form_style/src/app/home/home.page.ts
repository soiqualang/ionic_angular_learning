import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* chieudai:any;
  chieurong:any; */

  //chunhat: hình chữ nhật
  chunhat={
    chieudai: null,
    chieurong: null,
    chuvi: null,
  };

  constructor() {}

  chuvi_calc(){
    //alert(this.chunhat);
    this.chunhat.chuvi=(eval(this.chunhat.chieudai+this.chunhat.chieurong))*2;
    console.log(this.chunhat);
  }
  
}
