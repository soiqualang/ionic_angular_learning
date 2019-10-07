import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point  } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-congtrinh-thuyloi',
  templateUrl: './list-congtrinh-thuyloi.page.html',
  styleUrls: ['./list-congtrinh-thuyloi.page.scss'],
})
export class ListCongtrinhThuyloiPage implements OnInit {

  developers: dap_hientrang_point[] = [];

  dap = {};

  selectedView = 'dap_arr';
  

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
          console.log(this.developers);
        });
      }
    });
  }
  
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
