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

    // Editable data
    self.locations = ko.observableArray([
        new location("Starbucks", 44.63731107, -124.05294478),
        new location("JC Thriftway", 44.63726527, -124.05372798)
    ]);
 

    // Operations
    self.addLocation = function() {
        self.locations.push(new Location("", 44, -124));
    }
    self.removeSeat = function(location) { self.locations.remove(location) }
}

ko.applyBindings(new ReservationsViewModel());