function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: {lat: 44.636, lng: -124.053}
		});

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    
    /*
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: locations[i].name
      });
    });
*/
	/*
	for (i=0; i<ViewModel().length; i++) {
		console.log(ViewModel()[i].name);
		newMarker = ViewModel()[i];
		var marker = new google.maps.Marker({
			lat: newMarker.lat,
			lng: newMarker.lng,
			map: map
		});
	} */

	for (i=0; i<ViewModel().length; i++) {
		var data = ViewModel()[i];
		var latLng = new google.maps.LatLng(data.lat, data.lng);
		console.log(data.lng);

		var marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng},
			map: map,
			title: data.name
		});
	}

    // Add a marker clusterer to manage the markers.
    //var markerCluster = new MarkerClusterer(map, markers,
        //{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}


var locations =  [
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
    ]


// Class to represent a row in the seat reservations grid
function Location(name, lat, lng) {
    var self = this;
    self.name = name;
    self.lat = lat;
    self.lng = lng;  
}

// Overall viewmodel for this screen, along with initial state
function ViewModel() {
    var self = this;
 	
    self.locationList = ko.observableArray([]);

    locations.forEach(function(locationItem){
    	self.locationList.push(new Location(name=locationItem.name,lat=locationItem.lat, lng=locationItem.lng));
    	//console.log(locationItem)
    });
    // Operations
    self.addLocation = function() {
        self.locations.push(new Location("LUCAS MOYER", 44, -124));
    }
    self.removeSeat = function(location) { self.locations.remove(location) }
    //console.log(self.locationList());
    //console.log(locations);
    return self.locationList();
}

ko.applyBindings(new ViewModel());