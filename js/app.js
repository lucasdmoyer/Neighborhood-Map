
function initMap() {
	// creates new map centered on Newport, Oregon
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: {lat: 44.636, lng: -124.053},
			mapTypeId: 'satellite'
		});
	model.map.push(map);

	// Adds markers for each location
	for (i=0, len = model.locations.length; i<len; i++) {
		var data = model.locations[i];
		var latLng = new google.maps.LatLng(data.lat, data.lng);
		var marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng},
			map: map,
			title: data.name,
			label: data.name,
			content: data.description,
			animation:null,
			id:data.id
		});
		model.gmarkers.push(marker);
	}

	var infowindow = new google.maps.InfoWindow()

	// adds functionality to markers
	for (i=0; i<model.locations.length; i++) {
		model.gmarkers[i].addListener('click', function() {
			model.newstopic = this.content
			animarker(this.id);
        });

		google.maps.event.addListener(model.gmarkers[i], 'click', function() {
			infowindow.setContent(this.content)
			infowindow.open(map, this)
	    });
	}
	
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);
}

var model = {
	map: [],
	gmarkers :[],
	newstopic:'',
	locations: [
        {
            id: 0,
            name : 'Starbucks',
            lat : 44.637453,
            lng : -124.052610,
            description: "Starbucks: A place to use the fast internet"
        },
        {	
        	id: 1,
            name : 'JC Thriftway',
            lat : 44.637398,
            lng : -124.053980,
            description: "JC Thriftway: Where I go grocery shopping"
        },
        {
        	id: 2,
        	name:"Newport Rec Center",
        	lat: 44.634771,
        	lng: -124.051447,
        	description: "Newport Rec Center: I like to work out here after work"
        },
        {
        	id: 3,
        	name: "Oregon Coast Aquarium",
        	lat: 44.617536,
        	lng: -124.047303,
        	description: "Oregon Coast Aquarium: The place I first lived in Newport"
        }, 
        {
        	id: 4,
        	name: "Southwest Jetty Way",
        	lat: 44.614901, 
        	lng:-124.063831,
        	description: "South Jetty: I would go running here on the weekends"
        }
    ],
}
// Makes markers bounce when list item is clicked
function bounce() {
	viewModel.term(model.gmarkers[this.id].content)
	console.log(ViewModel.self.term)
	model.map[0].setCenter(new google.maps.LatLng(this.lat,this.lng));
	model.map[0].setZoom( Math.max(17, model.map[0].getZoom()) );
	model.gmarkers[this.id].setAnimation(google.maps.Animation.BOUNCE);
	var markerToStop = model.gmarkers[this.id];
	setTimeout(function(){
		markerToStop.setAnimation(null);
	}, 1400);
	
}
// Makes markers bounce when marker is clicked
function animarker(id) {
	model.gmarkers[id].setAnimation(google.maps.Animation.BOUNCE);
	var markerToStop = model.gmarkers[id];
	setTimeout(function(){
		markerToStop.setAnimation(null);
	}, 1400);
	
}


var Location = function(id, name, lat, lng, description) {
    this.id = id;
    this.name = name;  
    this.lat =lat;
    this.lng =lng;
    this.description = description;
}

var ViewModel = function() {


    var self = this;



    self.filter = ko.observable("");
	self.locationList = ko.observableArray([]);
	for (i=0; i<model.locations.length; i++) {
		self.locationList().push(new Location(id= model.locations[i].id, name=model.locations[i].name, lat=model.locations[i].lat, lng=model.locations[i].lng))
	}
	
	// Filters markers and list based on name
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
			}
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

	// Builds a list of articles that have to due with Newport Oregon.
	self.myArticles = ko.observableArray();
	self.term = ko.observable(model.newstopic)
	console.log(self.term())
	var nytApiKey = '0f35bca23a904bc7a71e0ac4846e0b3d';
	var nytBaseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
	var query = "Newport Oregon";
	var nytUrl = nytBaseUrl + '?q=' + self.term() + '&sort=newest&' + '&api-key=' + nytApiKey;
	self.term.subscribe(function() {
		console.log(self.term())
		$.getJSON(nytUrl, function(data) {
			self.myArticles.removeAll()
			var articles = data.response.docs;
			articles.forEach(function(article) {
				self.myArticles.push(article);
			});
		}).fail(function(error) {
			
		});
	})

	
}