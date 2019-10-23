import { Component, OnInit } from '@angular/core';
import { DatabaseService, cong_hientrang_point,hinhanh } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-cong-hientrang-point',
  templateUrl: './list-cong-hientrang-point.page.html',
  styleUrls: ['./list-cong-hientrang-point.page.scss'],
})
export class ListCongHientrangPointPage implements OnInit {

  cong_hientrang_point: cong_hientrang_point[] = [];
  cong_hientrang_point2: cong_hientrang_point[] = [];
  hinhanh: hinhanh[] = [];
  query:any;
  notifi:any;

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getcong_hientrang_point().subscribe(res => {
          this.cong_hientrang_point = res;
          this.cong_hientrang_point2 = res;
          //alert(this.cong_hientrang_point[0].ghichu_ten);
        });
        this.db.gethinhanh().subscribe(res => {
          this.hinhanh = res;
        });
        this.query='';
      }
    });
  }

  ishow(item){
    //alert(item.ghichu_ten+' | '+this.query)    
    this.notifi=item.ghichu_ten+' | '+this.query;
    if(item.ghichu_ten==this.query){
      return 1;
    }else if(this.query=='undefined'){
      return 1;
    }else if(this.query==''){
      return 1;
    }else{
      return 0;
    }

    /* return this.cong_hientrang_point.filter(item => item.ghichu_ten.includes(this.query) ||
        item.maso_cong.includes(this.query)
    ) */

  }

  search_filter(){
    this.notifi=this.query;
    this.cong_hientrang_point2=this.cong_hientrang_point.filter(item => item.ghichu_ten.toLowerCase().includes(this.query.toLowerCase()) || item.maso_cong.toLowerCase().includes(this.query.toLowerCase()));
  }

}
