/*-------
Localtion
--------*/
function getLocation() {
	var x = document.getElementById("status");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	document.frm_congtrinh.lat.value=position.coords.latitude;
	document.frm_congtrinh.lon.value=position.coords.longitude;
	
	document.frm_thuyvan.lat.value=position.coords.latitude;
	document.frm_thuyvan.lon.value=position.coords.longitude;
	
	loc2mark(position.coords.latitude,position.coords.longitude);
}

function loc2mark(lat,lon){
	removemark();
	marker = new L.marker([lat,lon], {draggable:'true'}).addTo(map);
	marker2 = new L.marker([lat,lon], {draggable:'true'}).addTo(map2);
	
	map.panTo(new L.LatLng(lat, lon));
	map.setZoom(16);
	
	map2.panTo(new L.LatLng(lat, lon));
	map2.setZoom(16);
	
	marker.on('dragend', function(event){
		marker = event.target;
		var position = marker.getLatLng();
		marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
		map.panTo(new L.LatLng(position.lat, position.lng));
		map.setZoom(16);
		
		document.frm_congtrinh.lat.value=position.lat;
		document.frm_congtrinh.lon.value=position.lng;
		
	});
	
	marker2.on('dragend', function(event){
		marker2 = event.target;
		var position = marker2.getLatLng();
		marker2.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
				
		map2.panTo(new L.LatLng(position.lat, position.lng));
		map2.setZoom(16);		
		
		document.frm_thuyvan.lat.value=position.lat;
		document.frm_thuyvan.lon.value=position.lng;
	});
}
function removemark(){
	if(marker!=''){
		map.removeLayer(marker);
		map2.removeLayer(marker2);
	}
}
</script>
<script type="text/javascript">
	$('.collapse').collapse();
</script> 
<script>
$(document).ready(function () {
	map = L.map('map',{
		fullscreenControl: {
			pseudoFullscreen: false
		}
    }).setView([10.147,106.437], 9);
	map2 = L.map('map2',{
		fullscreenControl: {
			pseudoFullscreen: false
		}
    }).setView([10.147,106.437], 9);
	var osmlyr = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		minZoom: 9,
		//attribution: 'OSM'
	});
	//}).addTo(map);
	
	var vetinhmap = L.tileLayer('http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
		maxZoom: 18,
		minZoom: 9,
	}).addTo(map);
	vetinhmap.addTo(map2);

	var angiang_bandonen =L.tileLayer('map/{z}/{x}/{y}.png', {
		maxZoom: 13,
		minZoom: 9,
		tms: false,
		attribution: '&copy; GIRS'
	});
	//});
	
	var baseMaps = {
		"Nền Vệ tinh": vetinhmap,
		//"Nền An Giang": angiang_bandonen,
		"OpenStreetMap": osmlyr
	};
	/*var overlayMaps = {
		"Cities": cities
	};*/
	
	L.control.layers(baseMaps).addTo(map);
	L.control.layers(baseMaps).addTo(map2);
	
	newMarkerGroup = new L.LayerGroup();
	marker='';
	marker2='';
	map.on('click', function(e){
	//map.once('click', function(e){
		//map.removeLayer(marker);
		removemark();
		marker = new L.marker(e.latlng, {draggable:'true'}).addTo(map);
		var coord = e.latlng.toString().split(',');
		var lat = coord[0].split('(');
		var lng = coord[1].split(')');
		document.frm_congtrinh.lat.value=lat[1];
		document.frm_congtrinh.lon.value=lng[0];
		//alert("You clicked the map at latitude: " + lat[1] + " and longitude: " + lng[0]);
		//alert(marker.getLatLng());
		marker.on('dragend', function(event){
			marker = event.target;
			var position = marker.getLatLng();
			marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
			map.panTo(new L.LatLng(position.lat, position.lng));
			document.frm_congtrinh.lat.value=position.lat;
			document.frm_congtrinh.lon.value=position.lng;
		});
	});
	map2.on('click', function(e){
		removemark();
		marker2 = new L.marker(e.latlng, {draggable:'true'}).addTo(map2);
		var coord = e.latlng.toString().split(',');
		var lat = coord[0].split('(');
		var lng = coord[1].split(')');
		document.frm_thuyvan.lat.value=lat[1];
		document.frm_thuyvan.lon.value=lng[0];
		//alert("You clicked the map at latitude: " + lat[1] + " and longitude: " + lng[0]);
		//alert(marker.getLatLng());
		marker2.on('dragend', function(event){
			marker2 = event.target;
			var position = marker.getLatLng();
			marker2.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
			map2.panTo(new L.LatLng(position.lat, position.lng));
			document.frm_thuyvan.lat.value=position.lat;
			document.frm_thuyvan.lon.value=position.lng;
		});
	});
	
	//load huong dan
	$('#huongdandiv').load('huongdandienthoai/index.html');
	
})