import { Component, OnInit } from '@angular/core';
import { DatabaseService, cong_hientrang_point,hinhanh } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-cong-hientrang-point',
  templateUrl: './list-cong-hientrang-point.page.html',
  styleUrls: ['./list-cong-hientrang-point.page.scss'],
})
export class ListCongHientrangPointPage implements OnInit {

  cong_hientrang_point: cong_hientrang_point[] = [];
  hinhanh: hinhanh[] = [];

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getcong_hientrang_point().subscribe(res => {
          this.cong_hientrang_point = res;
          //alert(this.cong_hientrang_point[0].ghichu_ten);
        });
        this.db.gethinhanh().subscribe(res => {
          this.hinhanh = res;
        });
      }
    });
  }

}
