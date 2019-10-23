import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, dap_hientrang_point  } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService,public api:ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //let congtrinh_dapId = params.get('id');
      this.id_congtrinh = params.get('id_congtrinh');
      this.tbl_name = params.get('tbl_name');
      this.photoService.hinhanh=[];
      this.photoService.reloadHinhanh(this.id_congtrinh,this.tbl_name);
      });
  }

  selectImage(){
    this.photoService.selectImage().then(res => {
      this.photoService.id_congtrinh=this.id_congtrinh;
      this.photoService.tbl_name=this.tbl_name;
    });
  }

  /* Gui du lieu ve server */

  postData(t1:any,tbl_name:any){
    this.api.postData(t1,tbl_name).then(async (res) => {
      console.log(res);
      let toast = await this.toast.create({
        message: 'Hình đã được gửi về hệ thống',
        duration: 1500
      });
      toast.present();
    });
  }

}
