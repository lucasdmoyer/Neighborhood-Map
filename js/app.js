function initMap(list) {

	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: {lat: 44.636, lng: -124.053}
		});
	model.map.push(map);

	console.log(model.locations);
	for (i=0; i<model.locations.length; i++) {
		var data = model.locations[i];
		var latLng = new google.maps.LatLng(data.lat, data.lng);
		console.log(data.lng);

		var marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng},
			map: map,
			title: data.name,
			label: data.name
		});
		model.gmarkers.push(marker);


	}

    // Add a marker clusterer to manage the markers.
    //var markerCluster = new MarkerClusterer(map, markers,
        //{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
var model = {
	map: [],
	gmarkers :[],
	locations: [
        {
            name : 'Starbucks',
            lat : 44.63731107,
            lng : -124.05294478
        },
        {
            name : 'JC Thriftway',
            lat : 44.63726527,
            lng : -124.05372798
        }
    ],
    filteredLocations : []

}  

// Class to represent a row in the seat reservations grid
var Location = function(name, lat, lng) {
    var self = this;
    this.name = name;  
    this.lat =lat;
    this.lng =lng;
}

function toggleMarkers() {
  for (i = 0; i < model.gmarkers.length; i++) {
    if (model.gmarkers[i].getMap() != null) model.gmarkers[i].setMap(null);
    else model.gmarkers[i].setMap(model.map[0]);
  }
}

// Overall viewmodel for this screen, along with initial state
var ViewModel = function() {
    var self = this;
    //self.locationList = ko.observableArray(locations);
    self.filter = ko.observable("");
    /*
	self.locationList = ko.observableArray([
	    { name: "Bungle", type: "Bear" },
	    { name: "George", type: "Hippo" },
	    { name: "Zippy", type: "Unknown" }
	]);
	*/
	self.locationList = ko.observableArray([]);
	for (i=0; i<model.locations.length; i++) {
		self.locationList().push(new Location(name=model.locations[i].name, lat=model.locations[i].lat, lng=model.locations[i].lng))
	}
	//Filters list of displayed locations based on User query string
	self.filteredList = ko.computed(function(){
		var filter = self.filter().toLowerCase();
		if(!filter){
			toggleMarkers();
			return self.locationList();
		}else{
			return ko.utils.arrayFilter(self.locationList(), function(item){
				var match = item.name.toLowerCase().indexOf(filter) >=0;
				return match;
			})
		}
	},ViewModel);
	model.filteredLocations = self.filteredList();
	
    
	
}


ko.applyBindings(new ViewModel());