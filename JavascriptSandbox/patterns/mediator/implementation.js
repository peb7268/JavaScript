 Mediator.add('TestObject', function() {
        
        var someNumber = 0; // sample variable
        var someString = 'another sample variable';
        
        return {
            name        : "TestObject",
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



// Mediator.broadcast("Initialize");                
// Mediator.broadcast('FakeEvent');                 
// Mediator.broadcast('SetString', ['test string']);

// Mediator.broadcast('FakeEvent');                 
// Mediator.broadcast('SessionStart');              
// Mediator.broadcast('Translate', ['this is also safely ignored']);

Mediator.broadcast('AccountInitialize');                 
Mediator.broadcast('MakeDeposit', [300]);
Mediator.broadcast('MakeWithdrawl', [50]);
Mediator.broadcast('MakeWithdrawl', [50]);
