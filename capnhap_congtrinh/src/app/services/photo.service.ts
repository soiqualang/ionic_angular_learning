import { Injectable } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

/* Camera */
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';

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

  constructor(private camera: Camera, private actionSheetController: ActionSheetController) { }


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(res => {
                      alert(res);
                    });
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA).then(res => {
                      alert(res);
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
        quality: 100,
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
}

class Photo {
  img: any;
}