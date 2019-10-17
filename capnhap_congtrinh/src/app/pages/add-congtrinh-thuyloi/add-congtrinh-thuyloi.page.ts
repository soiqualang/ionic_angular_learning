import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


@Component({
  selector: 'app-add-congtrinh-thuyloi',
  templateUrl: './add-congtrinh-thuyloi.page.html',
  styleUrls: ['./add-congtrinh-thuyloi.page.scss'],
})
export class AddCongtrinhThuyloiPage implements OnInit {

  congtrinh_dap = {};
  tmp={};
  dataReturned:any;

  locationCoords: any;
  timetest: any;

  constructor(public db: DatabaseService, private toast: ToastController,private modalController: ModalController,public androidPermissions:AndroidPermissions,public locationAccuracy:LocationAccuracy,public geolocation: Geolocation) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();
  }

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
      this.tmp={};
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
        //alert('Modal Sent Data :'+ dataReturned);
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
      this.congtrinh_dap['x']=resp.coords.longitude;
      this.congtrinh_dap['y']=resp.coords.latitude;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

}
