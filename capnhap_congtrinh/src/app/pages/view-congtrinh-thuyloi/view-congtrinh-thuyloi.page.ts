import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
/* Show thong bao */
import { ToastController } from '@ionic/angular';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';

import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';


@Component({
  selector: 'app-view-congtrinh-thuyloi',
  templateUrl: './view-congtrinh-thuyloi.page.html',
  styleUrls: ['./view-congtrinh-thuyloi.page.scss'],
})
export class ViewCongtrinhThuyloiPage implements OnInit {

  dap_hientrang_point: dap_hientrang_point=null;
  congtrinh_dapId: any;
  tbl_name='dap_hientrang_point';

  firstphoto:any;

  /* hinhanh: hinhanh=null; */
  /* hinhanh:any;
  tmp:any; */

  hinhanh={
    id: null,
    img: null,
    takedate: null,
    id_congtrinh: null,
    tbl_name: null,
    len: 0
  }

  dataReturned:any;
  

  constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService,private modalController: ModalController) { }

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

      this.db.table_to_arraywhere(this.tbl_name,'id',this.congtrinh_dapId).then(data => {
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
        //console.log(data);
      });
      
      /* this.db.table_to_arraywhere('hinhanh','id_congtrinh',this.congtrinh_dapId).then(data => {        
        let len=data.rows.length;
        this.hinhanh.img=data.rows.item(len-1).img;
        this.hinhanh.takedate=data.rows.item(len-1).takedate;
        this.hinhanh.len=len;
        console.log(data.rows.length);
      }); */

      this.db.table_to_array_2dk('hinhanh','id_congtrinh',this.congtrinh_dapId,'tbl_name',this.tbl_name).then(data => {        
        let len=data.rows.length;
        this.hinhanh.img=data.rows.item(len-1).img;
        this.hinhanh.takedate=data.rows.item(len-1).takedate;
        this.hinhanh.len=len;
        console.log(data.rows.length);
      });

      /* let sql='SELECT * FROM hinhanh WHERE id_congtrinh='+this.congtrinh_dapId+' AND tbl_name=\''+this.tbl_name+'\'';
      this.db.runSQL(sql).then(data => {
        let len=data.rows.length;
        this.hinhanh.img=data.rows.item(len-1).img;
        this.hinhanh.takedate=data.rows.item(len-1).takedate;
        this.hinhanh.len=len;
        console.log(data.rows.length);
      }); */
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

    this.db.update_table(this.tbl_name,field,value,'id',this.dap_hientrang_point.id).then(async (res) => {
      this.db.loaddap_hientrang_point();
      let toast = await this.toast.create({
        message: this.dap_hientrang_point.ten_dap+' đã được cập nhật',
        duration: 1500
      });
      toast.present();
    });
  }

  delete() {
    /* Xóa hình ảnh */
    let sql='DELETE FROM hinhanh WHERE id_congtrinh='+this.dap_hientrang_point.id+' AND tbl_name=\''+this.tbl_name+'\'';
    this.db.runSQL(sql).then(() => {
      /* Xóa đập hiện trạng */
      this.db.delete(this.tbl_name,'id',this.dap_hientrang_point.id).then(() => {
        this.db.loaddap_hientrang_point();
        this.router.navigateByUrl('/list-congtrinh-thuyloi');
      });
    });
  }

  go2page(page) {
    this.router.navigateByUrl('/'+page);
  }

  async openModal() {
    /* alert('hahaha'); */
    const modal = await this.modalController.create({
      component: MapModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

}
