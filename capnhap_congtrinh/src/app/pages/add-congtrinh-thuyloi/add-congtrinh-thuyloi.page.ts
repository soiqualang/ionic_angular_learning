import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point  } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-congtrinh-thuyloi',
  templateUrl: './add-congtrinh-thuyloi.page.html',
  styleUrls: ['./add-congtrinh-thuyloi.page.scss'],
})
export class AddCongtrinhThuyloiPage implements OnInit {

  dap_hientrang_point: dap_hientrang_point[] = [];

  dap = {};

  selectedView = 'congtrinh_dap_arr';
  

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        /* this.db.getdap_hientrang_point().subscribe(devs => {
          this.dap_hientrang_point = devs;
          //console.log(this.developers);
        }); */
      }
    });
  }

}
