import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point, hinhanh } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
/* Show thong bao */
import { ToastController } from '@ionic/angular';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-view-congtrinh-thuyloi',
  templateUrl: './view-congtrinh-thuyloi.page.html',
  styleUrls: ['./view-congtrinh-thuyloi.page.scss'],
})
export class ViewCongtrinhThuyloiPage implements OnInit {

  dap_hientrang_point: dap_hientrang_point=null;
  congtrinh_dapId: any;

  firstphoto:any;

  hinhanh: hinhanh=null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //let congtrinh_dapId = params.get('id');
      this.congtrinh_dapId = params.get('id');

      //this.firstphoto=this.photoService.photos[1].data;

      //console.log(this.congtrinh_dapId);
 
      /* this.db.getcongtrinh_dap(this.congtrinh_dapId).then(data => {
        this.dap_hientrang_point = data;
        //console.log(this.dap_hientrang_point);
      }); */

      this.db.table_to_arraywhere('dap_hientrang_point','id',this.congtrinh_dapId).then(data => {
        this.dap_hientrang_point = data.rows.item(0);
        /* this.dap_hientrang_point = {
          id: data.rows.item(0).id,
          ten_dap: data.rows.item(0).ten_dap, 
          ma_loai: data.rows.item(0).ma_loai, 
          x: data.rows.item(0).x, 
          y: data.rows.item(0).y, 
          wkt: data.rows.item(0).wkt
        }; */
        //console.log(this.dap_hientrang_point);
      });

      
      this.db.table_to_arraywhere('hinhanh','id_congtrinh',this.congtrinh_dapId).then(data => {
        this.hinhanh = data.rows.item(0);
      });

    });
  }

  update_table(){
    /* this.db.updatecongtrinh_dap(this.dap_hientrang_point).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Đập '+this.dap_hientrang_point.ten_dap+' đã được cập nhật',
        duration: 3000
      });
      toast.present();
    }); */

    let value=[this.dap_hientrang_point.ten_dap,this.dap_hientrang_point.ma_loai,this.dap_hientrang_point.x,this.dap_hientrang_point.y,this.dap_hientrang_point.wkt];
    let field=['ten_dap','ma_loai','x','y','wkt'];

    this.db.update_table('dap_hientrang_point',field,value,'id',this.dap_hientrang_point.id).then(async (res) => {
      this.db.loaddap_hientrang_point();
      let toast = await this.toast.create({
        message: this.dap_hientrang_point.ten_dap+' đã được cập nhật',
        duration: 1500
      });
      toast.present();
    });
  }

  delete() {
    this.db.delete('dap_hientrang_point','id',this.dap_hientrang_point.id).then(() => {
      this.db.loaddap_hientrang_point();
      this.router.navigateByUrl('/list-congtrinh-thuyloi');
    });
  }

  go2page(page) {
    this.router.navigateByUrl('/'+page);
  }

}
