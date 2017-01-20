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
    this.name = ko.observable(name);  
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
}
// Overall viewmodel for this screen, along with initial state
function ViewModel() {
    var self = this;
    //self.locationList = ko.observableArray(locations);
    self.filter = ko.observable("");
	self.locationList = ko.observableArray([
	    { name: "Bungle", type: "Bear" },
	    { name: "George", type: "Hippo" },
	    { name: "Zippy", type: "Unknown" }
	]);

	//Filters list of displayed locations based on User query string
	self.filteredList = ko.computed(function(){
		var filter = self.filter().toLowerCase();
		if(!filter){
			return self.locationList();
		}else{
			return ko.utils.arrayFilter(self.locationList(), function(item){
				var match = item.name.toLowerCase().indexOf(filter) >=0;
				return match;
			})
		}
	},ViewModel);


    var stringStartsWith = function (string, startsWith) {          
	    string = string || "";
	    if (startsWith.length > string.length)
	        return false;
	    return string.substring(0, startsWith.length) === startsWith;
	};
}


ko.applyBindings(new ViewModel());