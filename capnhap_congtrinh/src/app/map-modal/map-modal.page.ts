import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

/* Map leaflet */
import { map, tileLayer, marker, icon,latLng,control,LayerGroup,circle } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

declare var window;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.page.html',
  styleUrls: ['./map-modal.page.scss'],
})

/* declare global {
  interface Window {
    haha:any;
    map1:any;
    mappin:any;
  }
} */

export class MapModalPage implements OnInit {

  modalTitle:string;
  modelId:number;
  gps_lon:number;
  gps_lat:number;
  center:any;
  options:any;
  /* map1:any;
  mappin:any; */
  public window = window;

  constructor(private modalController: ModalController,private navParams: NavParams,public http: HttpClient,public plt: Platform,public router: Router, public activatedRoute:ActivatedRoute) {
    this.plt.ready().then(() => {
      this.initMap();
    });
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

  initMap() {
    /* var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
      document.getElementById('map').innerHTML = "";
    } */
    this.window.haha='hahahahahaha';
    var map1=map('map').setView([10.147,106.437], 9);
    this.window.map1=map1;

    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
    var mapboxlayer=tileLayer(
        mbUrl,
        {
            id: 'mapbox.light',
            /* attribution: 'Mapbox contributors' */
        }
    );
    map1.addLayer(mapboxlayer);

    var vetinhmap = tileLayer('http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      minZoom: 9,
    });

    var baseMaps = {
      "Nền Vệ tinh": vetinhmap,
      "OpenStreetMap": mapboxlayer
    };

    control.layers(baseMaps).addTo(map1);


    var mappin='';
    //Zoom to current location
    map1.locate({
      setView: true,
      maxZoom: 16
    });

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      if(mappin!=''){
        map1.removeLayer(mappin);
      }
      mappin = marker(e.latlng, {draggable:'true'}).addTo(map1);
      var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
      mappin.on('dragend', function(event){
        mappin = event.target;
        var position = mappin.getLatLng();

        mappin.setLatLng(latLng(position.lat, position.lng),{draggable:'true'});
        map1.panTo(latLng(position.lat, position.lng));
      });
    }

    map1.on('locationfound', onLocationFound);

    /* ======================= */

    map1.on('click', function(e){
        if(mappin!=''){
          map1.removeLayer(mappin);
        }

        mappin = marker(e.latlng, {draggable:'true'}).addTo(map1);
        var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        mappin.on('dragend', function(event){
          mappin = event.target;
          var position = mappin.getLatLng();

          mappin.setLatLng(latLng(position.lat, position.lng),{draggable:'true'});
          map1.panTo(latLng(position.lat, position.lng));
        });
      });


    /* Fix lỗi hiện không hết bản đồ */
    window.dispatchEvent(new Event('resize'));
  }

  zoom2current_location(){
    /* Khong hiu sao chay duoc :') */
    var map1=this.window.map1;
    map1.locate({
      setView: true,
      maxZoom: 16
    });
  }
  

}