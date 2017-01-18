var initialCats =  [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
        	nicknames: ['asdf', 'asdfdsa']
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
        	nicknames: ['asdf', 'asdfdsa', 'asdfas']
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]

// cat list
// make cats clickable

var ViewModel = function() {
	var self = this;
	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});


	this.currentCat = ko.observable(this.catList()[0]);
	// with the with: currentCat binding context, this is a cat
	this.incrementcounter = function() {
		this.clickCount(this.clickCount() + 1);
	};

	this.changeCat = function(cat) {
		self.currentCat(cat);
	};

}
/*
var List = function() {
	this.newList = ko.observableArray(ViewModel.catList);
	console.log(this.newList);
	return this.newList;
} */

var Cat = function(data) {
	this.clickCount = ko.observable(data.clickCount);
	// connects to data-bind="text : name"
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribution = ko.observable(data.imgAttribution);
	this.nicknames = ko.observableArray(data.nicknames);

	this.level = ko.computed(function() {
		if (this.clickCount() < 5) {
			return 'infant';
		} else {
			return 'adult';
		}
	}, this);



}

ko.applyBindings(new ViewModel());