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
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: locations[i].name
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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
function location(name, lat, long) {
    var self = this;
    self.name = name;
    self.lat = lat;
    self.long = long;    
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;
 

    // Operations
    self.addLocation = function() {
        self.locations.push(new Location("", 44, -124));
    }
    self.removeSeat = function(location) { self.locations.remove(location) }
}

ko.applyBindings(new ReservationsViewModel());