function initMap() {
	// creates new map centered on Newport, Oregon
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: {lat: 44.636, lng: -124.053},
			mapTypeId: 'satellite'
		});
	model.map.push(map);
	// Adds markers for each location
	for (i=0; i<model.locations.length; i++) {
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
	// adds functionality to markers
	for (i=0; i<model.locations.length; i++) {
		model.gmarkers[i].addListener('click', function() {
			animarker(this.id);
        });
		google.maps.event.addListener(model.gmarkers[i], 'click', function() {
	        new google.maps.InfoWindow({
	            content: this.content
	        }).open(map, this);
	    });
	}
	ko.applyBindings(new ViewModel());
}

var model = {
	map: [],
	gmarkers :[],
	infowindows:[],
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
	getNews(model.gmarkers[this.id].content);
	model.map[0].setCenter(new google.maps.LatLng(this.lat,this.lng));
	model.map[0].setZoom( Math.max(17, model.map[0].getZoom()) );
	model.gmarkers[this.id].setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){
		model.gmarkers[this.id].setAnimation(null);
	}, 1000);
	
}
// Makes markers bounce when marker is clicked
function animarker(id) {
	getNews(model.gmarkers[id].content);
	model.gmarkers[id].setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){
		model.gmarkers[id].setAnimation(null);
	}, 1000);
	
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
}


// New York Times api provides news based on description of location
function getNews(term) {
	$('.article-list').empty();
	var NYTKEY = '0f35bca23a904bc7a71e0ac4846e0b3d';
	var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + term + '&sort=newest&api-key=' + NYTKEY;
	$.getJSON(nytimesUrl, function(data){
	    articles = data.response.docs;
	    //$('.article-list').append('Articles about '+ '<br>' + term);
	    description = ko.observable(term);
	    if (articles.length ==0) {
	    	$('.article-list').append('<br> <br>' + 'There are no articles');
	    }

	    for (var i = 0; i < articles.length; i ++) {
	        if (i === 3) { break; }
	        var article = articles[i];
	        //Takes out paid death
	        if (article.section_name != 'Paid Death Notices') {
	            $('.article-list').append('<li class="article">' +
	            '<a href="'+article.web_url+'">'+article.headline.main+ '</a>'+
	                   '</li>');
	        }
	        
	    };
	})
	document.getElementById('container').style.height = document.getElementById('articles').style.height;
	return term;
}
