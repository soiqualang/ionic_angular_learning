import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

/* Map leaflet */
import { map, tileLayer, marker, icon,latLng,control,LayerGroup,circle } from 'leaflet';
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
  /* map1:any;
  mappin:any; */

  constructor(private modalController: ModalController,private navParams: NavParams,public http: HttpClient,public plt: Platform,public router: Router, public activatedRoute:ActivatedRoute) {
    this.plt.ready().then(() => {
      //this.http.get('https://oghuxxw1e6.execute-api.us-east-1.amazonaws.com/dev')
      //.pipe(map(res => res.json()))
      //.subscribe(restaurants => this.initMap(restaurants));
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

  /* removemark(){
    if(this.mappin!=''){
      this.map1.removeLayer(this.mappin);
    }
  } */
  map1:any;
  mappin:any;
  initMap() {

    /* this.map1=map('map').setView([10.147,106.437], 9); */
    var map1=map('map').setView([10.147,106.437], 9);
    this.map1=map1;

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
    //vetinhmap.addTo(map1);

    var baseMaps = {
      "Nền Vệ tinh": vetinhmap,
      "OpenStreetMap": mapboxlayer
    };

    control.layers(baseMaps).addTo(map1);

    var mappin='';

    /* marker([10.612018902571782, 106.44378662109376]).addTo(this.map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup(); */

    map1.on('click', function(e){
      //map.once('click', function(e){
        //map.removeLayer(marker);
        //removemark();
        if(mappin!=''){
          map1.removeLayer(mappin);
        }

        mappin = marker(e.latlng, {draggable:'true'}).addTo(map1);
        var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        /* document.frm_congtrinh.lat.value=lat[1];
        document.frm_congtrinh.lon.value=lng[0]; */
        mappin.on('dragend', function(event){
          mappin = event.target;
          var position = mappin.getLatLng();
          /* console.table(position); */

          /* console.log(latLng(position.lat, position.lng)); */

          mappin.setLatLng(latLng(position.lat, position.lng),{draggable:'true'});
          map1.panTo(latLng(position.lat, position.lng));
          /* document.frm_congtrinh.lat.value=position.lat;
          document.frm_congtrinh.lon.value=position.lng; */
        });
      });

      
      this.mappin=mappin;


    /* Fix lỗi hiện không hết bản đồ */
    window.dispatchEvent(new Event('resize'));
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      this.t2(99,88);
    } else { 
      console.table("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {

    console.table(position.coords);

    

    /* document.frm_congtrinh.lat.value=position.coords.latitude;
    document.frm_congtrinh.lon.value=position.coords.longitude;
    
    document.frm_thuyvan.lat.value=position.coords.latitude;
    document.frm_thuyvan.lon.value=position.coords.longitude; */
    
    //this.loc2mark(position.coords.latitude,position.coords.longitude);
  }

  /* loc2mark(lat,lon){
    if(mappin!=''){
      map1.removeLayer(mappin);
    }
    mappin = marker([lat,lon], {draggable:'true'}).addTo(map1);
    
    map1.panTo(latLng(lat, lon));
    map1.setZoom(16);
    
    mappin.on('dragend', function(event){
      mappin = event.target;
      var position = mappin.getLatLng();
      mappin.setLatLng(new latLng(position.lat, position.lng),{draggable:'true'});
      map1.panTo(new latLng(position.lat, position.lng));
      map1.setZoom(16);
      
      //document.frm_congtrinh.lat.value=position.lat;
      //document.frm_congtrinh.lon.value=position.lng;
      
    });
  } */

  t1(lat,lon){
    this.t2(lat,lon);
  }
  t2(lat,lon){
    alert(lat);
  }

  t3(){
    var map1=this.map1;
    var mappin=this.mappin;

    map1.locate({
      setView: true,
      maxZoom: 16
    });
    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      //marker(e.latlng).addTo(map1).bindPopup("You are within " + radius + " meters from this point").openPopup();

      //circle(e.latlng, radius).addTo(map1);
      //$scope.loading.hide();

      //Them marker
      
      //mappin = marker(e.latlng, {draggable:'true'}).addTo(map1);
      mappin.setLatLng(e.latlng,{draggable:'true'});

      map1.on('click', function(e){
        if(mappin!=''){
          map1.removeLayer(mappin);
        }

        var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        /* document.frm_congtrinh.lat.value=lat[1];
        document.frm_congtrinh.lon.value=lng[0]; */
        mappin.on('dragend', function(event){
          mappin = event.target;
          var position = mappin.getLatLng();
          /* console.table(position); */

          /* console.log(latLng(position.lat, position.lng)); */

          mappin.setLatLng(latLng(position.lat, position.lng),{draggable:'true'});
          map1.panTo(latLng(position.lat, position.lng));
          /* document.frm_congtrinh.lat.value=position.lat;
          document.frm_congtrinh.lon.value=position.lng; */
        });
      });
      
      //map1.panTo(latLng(lat, lon));
      //map1.setZoom(16);
      
      mappin.on('dragend', function(event){
        mappin = event.target;
        var position = mappin.getLatLng();
        mappin.setLatLng(new latLng(position.lat, position.lng),{draggable:'true'});
        map1.panTo(new latLng(position.lat, position.lng));
        //map1.setZoom(16);
        
        //document.frm_congtrinh.lat.value=position.lat;
        //document.frm_congtrinh.lon.value=position.lng;
        
      });

    }

    map1.on('locationfound', onLocationFound);
  }
  

}
