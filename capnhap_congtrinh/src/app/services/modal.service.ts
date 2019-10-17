import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  dataReturned:any;

  constructor(private modalController: ModalController) { }

  public async openChat() {
    const chat = await this.modalController.create({
      component: MapModalPage,
      animated: true,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
    chat.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
        return dataReturned.data;
      }
    });
    await chat.present();
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
