import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

/* Map leaflet */
import { Map, tileLayer, marker, icon } from 'leaflet';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.page.html',
  styleUrls: ['./map-modal.page.scss'],
})
export class MapModalPage implements OnInit {

  modalTitle:string;
  modelId:number;
  gps_lon:number;
  gps_lat:number;

  constructor(private modalController: ModalController,private navParams: NavParams,public http: HttpClient,public plt: Platform,public router: Router) {
    this.plt.ready().then(() => {
      /* this.http.get('https://oghuxxw1e6.execute-api.us-east-1.amazonaws.com/dev')
      .pipe(map(res => res.json()))
      .subscribe(restaurants => this.initMap(restaurants)); */
      this.initMap();
    });
  }

  initMap() {
    const map = new Map('map').setView([10.147,106.437], 9);

    /* tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); */
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(map);

    const customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64], 
      popupAnchor: [0, -20]
    });

    /* restaurants.forEach((restaurant) => {
      marker([restaurant.position.lat, restaurant.position.lgn], {icon: customMarkerIcon})
      .bindPopup(`<b>${restaurant.title}</b>`, { autoClose: false })
      .on('click', () => this.router.navigateByUrl('/restaurant'))
      .addTo(map).openPopup();
    }); */
  }

  

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.gps_lon = this.navParams.data.gps_lon;
    this.gps_lat = this.navParams.data.gps_lat;
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
