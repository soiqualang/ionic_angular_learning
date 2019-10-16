import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
/* Camera */
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

/* export interface hinhanh {
  id: number,
  img: string,
  takedate: string,
  id_congtrinh: number,
  tbl_name: string
}
 */
export class PhotoService {

  public photos: Photo[] = [];
  public hinhanh: hinhanh[] = [];
  id_congtrinh: any;
  tbl_name:any;

  constructor(private camera: Camera, private actionSheetController: ActionSheetController,public db: DatabaseService, private toast: ToastController) { }


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture_and_Save(this.camera.PictureSourceType.PHOTOLIBRARY).then(res => {
                      //alert(res);
                      //return res;
                      //this.photo2base64('base64img')
                    });
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture_and_Save(this.camera.PictureSourceType.CAMERA).then(res => {
                      //alert(res);
                      //return res;
                      //this.photo2base64('base64img')
                    });
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        /* quality: 100, */
        quality: 10,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    var base64img:any;

    return new Promise(resolve => {
      this.camera.getPicture(options).then((imageData) => {
        base64img='data:image/jpeg;base64,' + imageData;
        this.photos.unshift({
          img: base64img
        });
  
        // Save all photos for later viewing
        //this.storage.set('photos', this.photos);
        //console.log(base64img);
        resolve('base64img');
      }, (err) => {
        console.log("Camera issue:" + err);
      })
    });
  }

  takePicture_and_Save(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        /* quality: 100, */
        quality: 1,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    var base64img:any;

    return new Promise(resolve => {
      this.camera.getPicture(options).then((imageData) => {
        base64img='data:image/jpeg;base64,' + imageData;
        this.photos.unshift({
          img: base64img
        });
  
        // Save all photos for later viewing
        //this.storage.set('photos', this.photos);
        //console.log(base64img);

        /* alert(this.id_congtrinh+' | '+this.tbl_name); */
        //format yyyy/mm/dd - why chinese????!!!!!
        let today = new Date().toLocaleDateString('zh-Hans-CN')
        console.log(today)
        /* Save image to DB */
        let value=[base64img,today,this.id_congtrinh,this.tbl_name];
        let field=['img','takedate','id_congtrinh','tbl_name'];
        this.db.insert_table('hinhanh',field,value).then(async (res) => {
          let toast = await this.toast.create({
            message: 'Ảnh đã được thêm',
            duration: 1500
          });
          this.reloadHinhanh(this.id_congtrinh);
          toast.present();
        });

        resolve('base64img');
      }, (err) => {
        console.log("Camera issue:" + err);
      })
    });
  }

  reloadHinhanh(id_congtrinh){
    this.hinhanh=[];
    this.db.table_to_arraywhere('hinhanh','id_congtrinh',id_congtrinh).then(data => {
      let len=data.rows.length;
      for(let i=0;i<len;i++){
        this.hinhanh.unshift({
          rows: data.rows.item(i)
        });
      }
    });
  }

}

class Photo {
  img: any;
}

class hinhanh {
  rows: any;
}