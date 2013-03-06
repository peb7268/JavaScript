#The Oberver Pattern

##Summary 
1. First we create a publisher object. It has a few required members: 
	1. subscribers: ( an array of subscribers ) 
	2. publish: a method to announce to all the subscribers that events are taking place.
	3. subscribe: a method to subscribe to an event.
	4. unsubscribe: enough said. 
2. We create a method to ** notifySubscribers **
3. We create a method to turn an object into a publisher. ``makePublisher(joe) ``
4. Next we can subscribe to methods ```paper.subscribe(joe.drinkCoffee); ```
5. Lastly we trigger ( fire ) the events that the publisher is subscribing to. `` paper.daily(); or paper.monthly(); ``
