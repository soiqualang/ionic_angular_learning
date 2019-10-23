import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point,hinhanh } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-congtrinh-thuyloi',
  templateUrl: './list-congtrinh-thuyloi.page.html',
  styleUrls: ['./list-congtrinh-thuyloi.page.scss'],
})
export class ListCongtrinhThuyloiPage implements OnInit {

  dap_hientrang_point: dap_hientrang_point[] = [];
  dap_hientrang_point2: dap_hientrang_point[] = [];
  hinhanh: hinhanh[] = [];
  query:any;
  notifi:any;

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getdap_hientrang_point().subscribe(res => {
          this.dap_hientrang_point = res;
          this.dap_hientrang_point2 = res;
        });
        this.db.gethinhanh().subscribe(res => {
          this.hinhanh = res;
        });
      }
    });
  }

  search_filter(){
    this.notifi=this.query;
    this.dap_hientrang_point2=this.dap_hientrang_point.filter(item => item.ten_dap.toLowerCase().includes(this.query.toLowerCase()) || item.ma_loai.toLowerCase().includes(this.query.toLowerCase()));
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
