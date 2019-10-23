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

  toado={
    gps_lon:null,
    gps_lat:null
  }

  constructor(private modalController: ModalController,private navParams: NavParams,public http: HttpClient,public plt: Platform,public router: Router, public activatedRoute:ActivatedRoute) {
    this.plt.ready().then(() => {
      /* this.initMap(); */
    });
  }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    window.gps_lon = this.navParams.data.gps_lon;
    window.gps_lat = this.navParams.data.gps_lat;
    this.initMap();
  }

  async closeModal() {
    /* const onClosedData: any = window.gps_lon; */
    const onClosedData: any = {
      gps_lon:window.gps_lon,
      gps_lat:window.gps_lat
    };
    await this.modalController.dismiss(onClosedData);
  }

  initMap() {
    /* var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
      document.getElementById('map').innerHTML = "";
    } */
    this.window.haha='hahahahahaha';
    window.map1=map('map').setView([10.147,106.437], 9);

    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
    var mapboxlayer=tileLayer(
        mbUrl,
        {
            id: 'mapbox.light',
            /* attribution: 'Mapbox contributors' */
        }
    );
    //window.map1.addLayer(mapboxlayer);

    var vetinhmap = tileLayer('http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      minZoom: 9,
    });    
    window.map1.addLayer(vetinhmap);

    var baseMaps = {
      "Nền Vệ tinh": vetinhmap,
      "OpenStreetMap": mapboxlayer
    };

    control.layers(baseMaps).addTo(window.map1);


    window.mappin='';

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      if(window.mappin!=''){
        window.map1.removeLayer(window.mappin);
      }
      window.mappin = marker(e.latlng, {draggable:true}).addTo(window.map1);
      /* var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')'); */

      var position = window.mappin.getLatLng();
      //gan data cho form
      window.gps_lon = position.lng;
      window.gps_lat = position.lat;

      window.mappin.on('dragend', function(event){
        window.mappin = event.target;
        position = window.mappin.getLatLng();

        window.mappin.setLatLng(latLng(position.lat, position.lng),{draggable:true});
        window.map1.panTo(latLng(position.lat, position.lng));

        //gan data cho form
        window.gps_lon = position.lng;
        window.gps_lat = position.lat;
      });
    }

    function MakeandGo2loc(){
      if(window.mappin!=''){
        window.map1.removeLayer(window.mappin);
      }
      window.mappin = marker(latLng(window.gps_lat, window.gps_lon), {draggable:true}).addTo(window.map1);

      var position = window.mappin.getLatLng();

      window.mappin.on('dragend', function(event){
        window.mappin = event.target;
        position = window.mappin.getLatLng();

        window.mappin.setLatLng(latLng(position.lat, position.lng),{draggable:true});
        window.map1.panTo(latLng(position.lat, position.lng));

        //gan data cho form
        window.gps_lon = position.lng;
        window.gps_lat = position.lat;
      });

      window.map1.setView(position, 18);
    }

    /* if(window.gps_lon==9999 && window.gps_lat==9999){
      window.map1.on('locationfound', onLocationFound);
    }else{
      MakeandGo2loc();
    } */

    if(window.gps_lon==9999){
      window.map1.locate({
        setView: true,
        maxZoom: 16
      });
      window.map1.on('locationfound', onLocationFound);
    }else{
      MakeandGo2loc();
    }

    //window.map1.on('locationfound', onLocationFound);

    /* ======================= */

    window.map1.on('click', function(e){
        if(window.mappin!=''){
          window.map1.removeLayer(window.mappin);
        }

        window.mappin = marker(e.latlng, {draggable:true}).addTo(window.map1);
        /* var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')'); */
        var position = window.mappin.getLatLng();
        //gan data cho form
        window.gps_lon = position.lng;
        window.gps_lat = position.lat;

        window.mappin.on('dragend', function(event){
          window.mappin = event.target;
          position = window.mappin.getLatLng();

          window.mappin.setLatLng(latLng(position.lat, position.lng),{draggable:true});
          window.map1.panTo(latLng(position.lat, position.lng));

          //gan data cho form
          window.gps_lon = position.lng;
          window.gps_lat = position.lat;
        });
      });


    /* Fix lỗi hiện không hết bản đồ */
    window.dispatchEvent(new Event('resize'));
  }

  zoom2current_location(){
    /* Khong hiu sao chay duoc :') */
    window.map1.locate({
      setView: true,
      maxZoom: 16
    });
  }

  decimal_format(value,decimalPlaces){
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces);
  }
  

}