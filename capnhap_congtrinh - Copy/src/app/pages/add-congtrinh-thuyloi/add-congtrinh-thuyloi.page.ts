import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-congtrinh-thuyloi',
  templateUrl: './add-congtrinh-thuyloi.page.html',
  styleUrls: ['./add-congtrinh-thuyloi.page.scss'],
})
export class AddCongtrinhThuyloiPage implements OnInit {

  congtrinh_dap = {};

  constructor(public db: DatabaseService, private toast: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        
      }
    });
  }

  insert_table() {     
    let value=[this.congtrinh_dap['ten_dap'],this.congtrinh_dap['ma_loai'],this.congtrinh_dap['x'],this.congtrinh_dap['y'],this.congtrinh_dap['wkt']];
    let field=['ten_dap','ma_loai','x','y','wkt'];
    this.db.insert_table('dap_hientrang_point',field,value)
    .then(async (res) => {
      //Sau khi insert thi lam rong mang congtrinh_dap de nhan gia tri nguoi dung nhap vao
      this.db.loaddap_hientrang_point();
      //message: this.congtrinh_dap['ten_dap']+' đã được thêm',
      let toast = await this.toast.create({
        message: this.congtrinh_dap['ten_dap']+' đã được thêm',
        duration: 1500
      });
      toast.present();
      this.congtrinh_dap = {};
    });
  }

}
