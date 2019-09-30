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
  vatthe={
    chieudai: null,
    chieurong: null,
    chuvi: null,
    loaihinhhoc: null
  };

  dm_hinhhoc=[
    {name:'hinhvuong',label:'Hình vuông'},
    {name:'hinhchunhat',label:'Hình chữ nhật'},
    {name:'hinhtamgiac',label:'Hình tam giác'},
    {name:'hinhtron',label:'Hình tròn'},
    {name:'hinhthang',label:'Hình thang'}
  ];

  constructor() {
    //this.vatthe.loaihinhhoc={name:'hinhchunhat',label:'Hình chữ nhật'};
    this.vatthe.loaihinhhoc='hinhchunhat';
  }

  chuvi_calc(){
    //alert(this.vatthe);
    this.vatthe.chuvi=(eval(this.vatthe.chieudai+this.vatthe.chieurong))*2;
    console.log(this.vatthe);
  }
  
}
