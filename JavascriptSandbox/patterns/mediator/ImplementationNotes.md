#The Mediator Pattern | An Air Traffic Controller for JavaScript 
This pattern is also known as the sandbox pattern and is very closely related to the Event Hub pattern. 
url: http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediator/

##Implementation 
To implement the Mediator pattern you must do 2 things. 

1. Add the item to be tracked to the mediator 
2. & broadcast the events to be listened for.

####1. Adding an item to be tracked to the Mediator. 
```js
Mediator.add('Account', function() {        
        var startingBalance = 250; // sample variable
        var accountHolder   = 'Paul Barrick';
        var balance;
        
        return {
            name        : "Account12345",
            onAccountInitialize: function() 
            {
                balance = startingBalance + 0;
                console.log(this.name, " has ",  '$',balance);
            },
            onMakeDeposit: function(amountToDeposit) 
            {
                console.log("Making a deposit.");
                balance = startingBalance + amountToDeposit;
                console.log(this.name + " now has: " + balance);
            },
            onMakeWithdrawl: function(amountToWithdraw) 
            {
                console.log("\n\n");
                console.log('Before withdrawl the balance is: ', balance);
                console.log('Making a withdrawl');
                balance = balance - amountToWithdraw;
                console.log('The new balance is: ', balance);
            }
        }
}());
```

####2. Broadcasting events to our new object! 
Broadcasting is essentially triggering an event and letting the control tower know it took place. 
This is where you would pass data to the handler. 

```js
Mediator.broadcast('AccountInitialize');                 
Mediator.broadcast('MakeDeposit', [300]);
Mediator.broadcast('MakeWithdrawl', [50]);
Mediator.broadcast('MakeWithdrawl', [50]);
````

####The Full Code 
```js
Mediator.add('SomeObject', function() {
        
        var someNumber = 0; // sample variable
        var someString = 'another sample variable';
        
        return {
            name        : "SomeObject",
            onInitialize: function() {
                console.log(this.name + " initialized.");
            },
            onFakeEvent : function() {
                someNumber++;
                console.log("Handled " + someNumber + " times!");
            },
            onSetString : function(str) {
                someString = str;
                console.log('Assigned ' + someString);
            }
        }
}());

Mediator.add('Account', function() {
        
        var startingBalance = 250; // sample variable
        var accountHolder   = 'Paul Barrick';
        var balance;
        
        return {
            name        : "Account12345",
            onAccountInitialize: function() 
            {
                balance = startingBalance + 0;
                console.log(this.name, " has ",  '$',balance);
            },
            onMakeDeposit: function(amountToDeposit) 
            {
                console.log("Making a deposit.");
                balance = startingBalance + amountToDeposit;
                console.log(this.name + " now has: " + balance);
            },
            onMakeWithdrawl: function(amountToWithdraw) 
            {
                console.log("\n\n");
                console.log('Before withdrawl the balance is: ', balance);
                console.log('Making a withdrawl');
                balance = balance - amountToWithdraw;
                console.log('The new balance is: ', balance);
            }
        }
}());



Mediator.broadcast("Initialize");                
Mediator.broadcast('FakeEvent');                 
Mediator.broadcast('SetString', ['test string']);

Mediator.broadcast('FakeEvent');                 
Mediator.broadcast('SessionStart');              
Mediator.broadcast('Translate', ['this is also safely ignored']);

Mediator.broadcast('AccountInitialize');                 
Mediator.broadcast('MakeDeposit', [300]);
Mediator.broadcast('MakeWithdrawl', [50]);
Mediator.broadcast('MakeWithdrawl', [50]);
```
