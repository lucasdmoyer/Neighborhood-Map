function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: {lat: 44.636, lng: -124.053}
		});
	model.map.push(map);

	for (i=0; i<model.locations.length; i++) {
		var data = model.locations[i];
		var latLng = new google.maps.LatLng(data.lat, data.lng);
		var marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng},
			map: map,
			title: data.name,
			label: data.name,
			content: data.description
		});
		var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+data.name+'</h1>'+
            '<div id="bodyContent">'+
            '<p>'+data.description+'!</p>'+
            '</div>'+
            '</div>';
		model.gmarkers.push(marker);
	}
	for (i=0; i<model.locations.length; i++) {
		console.log('looping');
		google.maps.event.addListener(model.gmarkers[i], 'click', function() {
			console.log(model.locations[i]);
			console.log(model.gmarkers)
	        new google.maps.InfoWindow({
	            content: this.content
	        }).open(map, this);
	    });
	}

	ko.applyBindings(new ViewModel())
}
var model = {
	map: [],
	gmarkers :[],
	infowindows:[],
	locations: [
        {
            id: 0,
            name : 'Starbucks',
            lat : 44.63731107,
            lng : -124.05294478,
            description: "A place to use the fast internet"
        },
        {	
        	id: 1,
            name : 'JC Thriftway',
            lat : 44.63726527,
            lng : -124.05372798,
            description: "Where I go grocery shopping"
        }
    ],
    filteredLocations : []

}  

// Class to represent a row in the seat reservations grid
var Location = function(id, name, lat, lng) {
    var self = this;
    this.id = id;
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

function putMarker(id) {
	console.log(id + 'put');
	model.gmarkers[id].setVisible(true);
}

function takeMarker(id) {
	console.log(id + 'take');
	model.gmarkers[id].setVisible(false);
}

function putAllMarkers() {
	for (i=0; i<ViewModel().locationList().length; i++) {
		putMarker(i);
	}
}

function takeAllMarkers() {
	for (i=0; i<ViewModel().locationList().length; i++) {
		takeMarker(i);
	}
}
// Overall viewmodel for this screen, along with initial state
var ViewModel = function() {
    var self = this;
    self.filter = ko.observable("");
	self.locationList = ko.observableArray([]);
	for (i=0; i<model.locations.length; i++) {
		self.locationList().push(new Location(id= model.locations[i].id, name=model.locations[i].name, lat=model.locations[i].lat, lng=model.locations[i].lng))
	}
	
	self.filteredList = ko.computed(function(){
		var filter = self.filter().toLowerCase();
		if(!filter){
			for (i=0; i<self.locationList().length; i ++) {
				model.gmarkers[i].setVisible(true);
			}
			return self.locationList();
		}else{
			var string = self.filter().toLowerCase();
			for(i=0; i < self.locationList().length; i++) {
				var str2 = model.gmarkers[i].title.toLowerCase();
				if(str2.search(string) >=0) {
					model.gmarkers[i].setVisible(true);
				} else {
					model.gmarkers[i].setVisible(false);
				}
			};
			return ko.utils.arrayFilter(self.locationList(), function(item){
				var match = item.name.toLowerCase().indexOf(filter) >=0;
				return match;
			})
		}
	},ViewModel);
	var filter = self.filter().toLowerCase();
	if (!filter) {
		for (i=0; i<self.locationList().length; i ++) {
			model.gmarkers[i].setVisible(true);
		}
	} else {
		console.log('yes filter');
		var string = self.filter().toLowerCase();
		for(i=0; i < self.locationList().length; i++) {
			var str2 = model.gmarkers[i].name.toLowerCase();
			if(str2.search(string) >=0) {
				model.gmarkers[i].setVisible(true);
			} else {
				model.gmarkers[i].setVisible(false);
			}
		};
	}
	
    
	
}


