$(document).ready(function () {

	//Open street  Map
	var coord = [30.3848236, -88.6386084]; // <--- coordinates here

	var map = L.map('map-canvas', { scrollWheelZoom:false}).setView(coord, 19);

	 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 22,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Standard American Web</a>'
	}).addTo(map);

	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri,TomTom'
	}).addTo(map);

	// custom icon
	var customIcon = L.icon({
		iconUrl: 'img/mapmarker.png',
		  iconSize:     [64, 64], // size of the icon
	iconAnchor:   [32, 63] // point of the icon which will correspond to marker's location
		});

	// marker object, pass custom icon as option, add to map         
	var marker = L.marker(coord, {icon: customIcon}).addTo(map);

});	

			