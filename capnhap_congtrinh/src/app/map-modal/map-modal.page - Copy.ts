import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

/* Map leaflet */
import { Map, tileLayer, marker, icon,latLng } from 'leaflet';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

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
  center:any;
  options:any;

  constructor(private modalController: ModalController,private navParams: NavParams,public http: HttpClient,public plt: Platform,public router: Router, public activatedRoute:ActivatedRoute) {
    this.plt.ready().then(() => {
      //this.http.get('https://oghuxxw1e6.execute-api.us-east-1.amazonaws.com/dev')
      //.pipe(map(res => res.json()))
      //.subscribe(restaurants => this.initMap(restaurants));
      this.initMap();
    });
  }

  /* ionViewDidEnter() {
    this.center = latLng(Number(this.activatedRoute.snapshot.paramMap.get("latitude")), Number(this.activatedRoute.snapshot.paramMap.get("longitude")));
    this.options = {
      layers: [
        tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "..." })
      ],
      zoom: 17,
      center: this.center,
      attributionControl: false,
    };

    //this.layers.push(this.mapService.getMarker(this.center, "assets/icon/map/placeholder.png"));

  } */

  initMap() {

    var mymap = new Map('map').setView([51.505, -0.09], 13);

    var osm=tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{ 
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
    osm.addTo(mymap);

    window.dispatchEvent(new Event('resize'));

  //  L.tileLayer('http://*.*.*.*/hot/{z}/{x}/{y}.png', {
  //              attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  //              maxZoom: 18
 //            }).addTo(mymap);

    marker([51.5, -0.09]).addTo(mymap).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    /* L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle."); */


    /* const map = new Map('map').setView([10.147,106.437], 9); */

    /* var map = new Map('map', {
        center: [10.7912802,106.0836726],
        zoom: 13
    }); */

    /* tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); */
    /* tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(map); */

    /* const customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64], 
      popupAnchor: [0, -20]
    }); */

    /* restaurants.forEach((restaurant) => {
      marker([restaurant.position.lat, restaurant.position.lgn], {icon: customMarkerIcon})
      .bindPopup(`<b>${restaurant.title}</b>`, { autoClose: false })
      .on('click', () => this.router.navigateByUrl('/restaurant'))
      .addTo(map).openPopup();
    }); */


    /* var GoogleHybrid_url='https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
        
    var GoogleHybrid=tileLayer(
        GoogleHybrid_url,
        {
            attribution: 'Map data © Google contributors'
        }
    );
    //GoogleHybrid.addTo(map);

    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
    var mapboxlayer=new L.TileLayer(
        mbUrl,
        {
            id: 'mapbox.light',
            attribution: 'Mapbox contributors'
        }
    );
    
    mapboxlayer.addTo(map);
    //map.addLayer(mapboxlayer); */
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
