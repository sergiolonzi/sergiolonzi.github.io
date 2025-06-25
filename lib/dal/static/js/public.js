var map;
var layer;
var markers = [];
$(document).ready(function($) {
	$('#yearfilter').val('all');
});

function initialize() {
	map = L.map('map_canvas').setView([-34.905833, -56.191389], 11);
	layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	layer.addTo(map);
	var parameters = {};
	$.ajax({
		url: "update.js",
		dataType: 'json',
		data: parameters
	})
		.done(function(data) {
			for (i = 0; i < data.locations.length; i++) {
				var marker = L.marker([data.locations[i].latitude, data.locations[i].longitude]).addTo(map);
				var label = "Aqui hubo " + data.locations[i].amount + " Accidentes."
				markers[i] = marker;				
				marker.bindPopup(label);
			}
		})
		.fail(function() {
			alert("error");
		})
}

function clear() {
	for (const element of markers) {
		var marker = element;
		map.removeLayer(marker);
	}
	markers = [];
}

function update() {
	var parameters = {};
	var year_filter = $('#year_filter').val();
	clear();
	
	var url = "update" + year_filter + ".js"
	$.ajax({
		url: url,
		dataType: 'json',
		data: parameters
	})
		.done(function(data) {
			clear();
			for (i = 0; i < data.locations.length; i++) {
				var marker = L.marker([data.locations[i].latitude, data.locations[i].longitude]).addTo(map);
				var label = "Aqui hubo " + data.locations[i].amount + " Accidentes."
				markers[i] = marker;				
				marker.bindPopup(label);
				markers[i] = marker;
				
			}
		})
		.fail(function() {
			alert("error");
		})
}

function showAboutUs() {
	$("#about-us-modal").dialog({
		height: 550,
		width: 500,
		modal: true
	});
}

function ranking() {
	$("#ranking-modal").dialog({
		height: 600,
		width: 659,
		modal: true
	});
}


function getRanking() {
	var output = "<table>"
	$.get('ranking.js', function(data) {
		var locations = eval(data)
		for (i = 0; i < locations.length; i++) {
			output += "<tr>"
			output += "<td>"
			output += "</td>"
			output += "<td>"
			output += "</td>"
			output += "</tr>"
		}
		output += "</table>"
		output = data
	})
}
