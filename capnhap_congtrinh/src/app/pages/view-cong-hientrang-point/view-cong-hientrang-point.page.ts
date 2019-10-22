import { Component, OnInit } from '@angular/core';
/* DatabaseService */
import { DatabaseService, cong_hientrang_point } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
/* Show thong bao */
import { ToastController } from '@ionic/angular';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';

import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-view-cong-hientrang-point',
  templateUrl: './view-cong-hientrang-point.page.html',
  styleUrls: ['./view-cong-hientrang-point.page.scss'],
})
export class ViewCongHientrangPointPage implements OnInit {

  cong_hientrang_point: cong_hientrang_point=null;
  fid: any;
  tbl_name='cong_hientrang_point';
  firstphoto:any;

  hinhanh={
    id: null,
    img: null,
    takedate: null,
    id_congtrinh: null,
    tbl_name: null,
    len: 0
  }

  dataReturned:any;
  imgarr_len:any;
  first_img:any;
  img_takedate:any;

  locationCoords: any;

  constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService,private modalController: ModalController,public androidPermissions:AndroidPermissions,public locationAccuracy:LocationAccuracy,public geolocation: Geolocation) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fid = params.get('id');
      this.db.table_to_arraywhere(this.tbl_name,'id',this.fid).then(data => {
        this.cong_hientrang_point = data.rows.item(0);        
      });      
      this.reloadHinhanh(this.fid,this.tbl_name);
    });
  }

  ionViewDidEnter() {
    this.reloadHinhanh(this.fid,this.tbl_name);
  }

  reloadHinhanh(id_congtrinh,tbl_name){
    this.db.table_to_array_2dk('hinhanh','id_congtrinh',id_congtrinh,'tbl_name',tbl_name).then(data => {
      let len=data.rows.length;
      this.imgarr_len=len;
      this.first_img=data.rows.item(len-1).img;
      this.img_takedate=data.rows.item(len-1).takedate;
      //alert(this.imgarr_len);

      this.hinhanh.img=data.rows.item(len-1).img;
      this.hinhanh.takedate=data.rows.item(len-1).takedate;
      this.hinhanh.len=len;
      console.log(data.rows.length);
    });
  }

  update_table(){
    let value=[this.cong_hientrang_point.ghichu_ten,this.cong_hientrang_point.maso_cong,this.cong_hientrang_point.ghichu_kiemtra,this.cong_hientrang_point.x,this.cong_hientrang_point.y];
    let field=['ghichu_ten','maso_cong','ghichu_kiemtra','x','y'];

    this.db.update_table(this.tbl_name,field,value,'id',this.cong_hientrang_point.id).then(async (res) => {
      this.db.loadcong_hientrang_point();
      let toast = await this.toast.create({
        message: this.cong_hientrang_point.ghichu_ten+' đã được cập nhật',
        duration: 1500
      });
      toast.present();
    });
  }

  delete() {
    /* Xóa hình ảnh */
    let sql='DELETE FROM hinhanh WHERE id_congtrinh='+this.cong_hientrang_point.id+' AND tbl_name=\''+this.tbl_name+'\'';
    this.db.runSQL(sql).then(() => {
      /* Xóa đập hiện trạng */
      this.db.delete(this.tbl_name,'id',this.cong_hientrang_point.id).then(() => {
        this.db.loadcong_hientrang_point();
        this.router.navigateByUrl('/list-cong-hientrang-point');
      });
    });
  }

  async openModal() {
    /* alert('hahaha'); */
    const modal = await this.modalController.create({
      component: MapModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Bản đồ",
        "gps_lon":9999,
        "gps_lat":8888
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.cong_hientrang_point.x=this.dataReturned.gps_lon;
        this.cong_hientrang_point.y=this.dataReturned.gps_lat;
        console.log(this.dataReturned);
      }
    });
 
    return await modal.present();
  }

  /* Geolocation */
  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
 
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
 
  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;

      this.cong_hientrang_point.x=resp.coords.longitude;
      this.cong_hientrang_point.y=resp.coords.latitude;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }


}
