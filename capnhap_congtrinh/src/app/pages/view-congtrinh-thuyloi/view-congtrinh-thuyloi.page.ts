import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point  } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-congtrinh-thuyloi',
  templateUrl: './view-congtrinh-thuyloi.page.html',
  styleUrls: ['./view-congtrinh-thuyloi.page.scss'],
})
export class ViewCongtrinhThuyloiPage implements OnInit {

  dap_hientrang_point: dap_hientrang_point[] = [];
  congtrinh_dapId: any;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.congtrinh_dapId = params.get('id');
      console.log(this.congtrinh_dapId);
 
      /* this.db.getDeveloper(devId).then(data => {
        this.developer = data;
        this.skills = this.developer.skills.join(',');
      }); */
    });
  }

}
