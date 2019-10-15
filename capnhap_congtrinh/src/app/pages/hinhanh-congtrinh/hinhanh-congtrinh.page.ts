import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point  } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
/* Show thong bao */
import { ToastController } from '@ionic/angular';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-hinhanh-congtrinh',
  templateUrl: './hinhanh-congtrinh.page.html',
  styleUrls: ['./hinhanh-congtrinh.page.scss'],
})
export class HinhanhCongtrinhPage implements OnInit {

  id_congtrinh: any;
  tbl_name:any;

  constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //let congtrinh_dapId = params.get('id');
      this.id_congtrinh = params.get('id_congtrinh');
      this.tbl_name = params.get('tbl_name');

      

      //console.log(this.congtrinh_type);
 
      /* this.db.getcongtrinh_dap(this.congtrinh_dapId).then(data => {
        this.dap_hientrang_point = data;
        //console.log(this.dap_hientrang_point);
      }); */

      /* this.db.table_to_arraywhere('dap_hientrang_point','id',this.congtrinh_dapId).then(data => {
        this.dap_hientrang_point = {
          id: data.rows.item(0).id,
          ten_dap: data.rows.item(0).ten_dap, 
          ma_loai: data.rows.item(0).ma_loai, 
          x: data.rows.item(0).x, 
          y: data.rows.item(0).y, 
          wkt: data.rows.item(0).wkt
        }; */
        //console.log(this.dap_hientrang_point);
      });
  }

  selectImage(){
    this.photoService.selectImage().then(res => {
      console.log(res);
    });
  }

}
