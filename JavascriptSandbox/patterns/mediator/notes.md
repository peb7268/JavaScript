###Implementation 
1. Add the item to the metiator
2. broadcast the events 

          
````markdown
Mediator.add('TestObject', function() {
        
        var someNumber = 0; // sample variable
        var someString = 'another sample variable';
        
        return {
            onInitialize: function() {
                // this.name is automatically assigned by the Mediator
                console.log(this.name + " initialized.");
            },
            onFakeEvent: function() {
                someNumber++;
                console.log("Handled " + someNumber + " times!");
            },
            onSetString: function(str) {
                someString = str;
                console.log('Assigned ' + someString);
            }
        }
}());



Mediator.broadcast("Initialize");                 // alerts "TestObject initialized"
Mediator.broadcast('FakeEvent');                  // alerts "Handled 1 times!" (I know, bad grammar)
Mediator.broadcast('SetString', ['test string']); // alerts "Assigned test string"

Mediator.broadcast('FakeEvent');                  // alerts "Handled 2 times!"
Mediator.broadcast('SessionStart');               // this call is safely ignored
Mediator.broadcast('Translate', ['this is also safely ignored']);
`````