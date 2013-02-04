/*
* Publisher should have these members: 
*	
*	subscribers: 	array
*	subscribe: 		method that adds to the subscribers array
*	unsubscribe: 	method that removes from the subscribers array
*	publish:  		loop throuch each subscriber and call all of its methods ( what it said it listens for when it subscribes )
* 	
* 	The subscription methods all need types because the publisher method may publish many different methods.
*/




var publisher = {
	subscribers: {
		any: []   
	},

	subscribe: function(fn, type){
		type = type || 'any';

		if( typeof this.subscribers[type] === "undefined" ) {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn);
	},

	unsubscribe: function(fn, type){
		this.notifySubscribers('unsubscribe', fn, type);
	},

	publish: function(publication, type){
		this.notifySubscribers('publish', publication, type);
	},

	notifySubscribers: function (action, arg, type){
		var pubtype 		= type || 'any',
			subscribers 	= this.subscribers[pubtype],
			i,
			max 			= subscribers.length;

			for( i = 0; i < max; i++){
				if(action == 'publish'){
					subscribers[i](arg);
				} else {
					if(subscribers[i] === arg){
						subscribers.splice(i, 1);
					}
				}
			}
	}
};

function makePublisher(object){
	var i;
	for(i in publisher){
		if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function'){
			object[i] = publisher[i];
		}
	}
	object.subscribers = { any:[] };
}

function captureClick(event){
	event.preventDefault();
	var result 	= $(event.target).html();
}


$('document').ready(function(){
		var result = document.getElementById('result');
		result.innerHTML = "<p>Welcome to the pubsub game.</p>";

		var $link 		= $($('#sidebar a'));
	
		//bindings
		$link.on('click', null, captureClick);
});


/* Implementation
	
	var paper = { daily: function(){ this.publish("big news today"); }, monthly: function(){ this.publish("interesting analysis", "monthly"); }  };
	makePublisher(paper);

	var joe = { drinkCoffee: function(paper) { console.log('just read ' + paper); }, sundayPreNap: function(monthly) { console.log('about to fall asleep ', monthly); } };

	//Subscribe to the events
	paper.subscribe(joe.drinkCoffee);
	paper.subscribe(joe.sundayPreNap, 'monthly');


	//Fire the events
	paper.daily();
	paper.daily();
	paper.monthly();
*/

