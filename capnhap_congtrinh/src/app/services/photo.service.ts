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
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
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

    this.camera.getPicture(options).then((imageData) => {
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

      // Save all photos for later viewing
      //this.storage.set('photos', this.photos);

    }, (err) => {
      console.log("Camera issue:" + err);
    });
 
  }
}

class Photo {
  data: any;
}