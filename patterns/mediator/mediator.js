/* -- The mediator pattern ----------------------------------------------------------------------
*  Notes: Referred to as sandbox by Nicholas Zackas
*  url: http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediator/
*  
*----------------------------------------------------------------------------------------------------------------*/    

Mediator = (function() {
        var debug = function() { /* console.log or air.trace as desired */ },
            components = {};

       /* -- Broadcast that an event is taking place ----------------------------------------------------------------------
        *  event: the event thats taking place. ( click, hover, custom event, ect...)
        *  args:  the arguments the event took
        *  source:
        *  exposed as: broadcast
        *----------------------------------------------------------------------------------------------------------------*/    
        var broadcast = function(event, args, source) {
            if (!event) {
                return;
            }
            args = args || [];
            for (var c in components) {
                if (typeof components[c]["on" + event] == "function") {
                    try {
                        //debug("Mediator calling " + event + " on " + c);
                        source = source || components[c];
                        components[c]["on" + event].apply(source, args);
                    } catch (err) {
                        debug(["Mediator error.", event, args, source, err].join(' '));
                    }
                }
            }
        };
        
        /* -- Add an component to the internal components object ---------------------------------------------------------
        *  name:                what the component is called internally
        *  component:           the arguments the event took
        *  replaceDuplicate:    to overwrite an existing value or not
        *  exposed as:          add
        *----------------------------------------------------------------------------------------------------------------*/    
        var addComponent = function(name, component, replaceDuplicate) {
            if(name in components) {
                if(replaceDuplicate) {
                    removeComponent(name);
                } else {
                    throw new Error('Mediator name conflict: ' + name);
                }
            }
            components[name] = component;
        };
        
        var removeComponent = function(name) {
            if (name in components) {
                delete components[name];
            }
        };
        
        var getComponent = function(name) {
            return components[name]; // undefined if component has not been added
        };
        
        var contains = function(name) {
            return (name in components);
        };
        
        //module revealing pattern: This is the interface that returns. Its a facade for the acutal private method names.
        return {
            name      : "Mediator",
            broadcast : broadcast,
            add       : addComponent,
            rem       : removeComponent,
            get       : getComponent,
            has       : contains
        };
})();



/* -- Implementation -----------------------------------------------------------------------------------------------
        *  1) Add the item to the metiator
        *  2) broadcast the events
        *  
*------------------------------------------------------------------------------------------------------------------*/    
Mediator.add('TestObject', function() {
        
        var someNumber = 0; // sample variable
        var someString = 'another sample variable';
        
        return {
            onInitialize: function() {
                // this.name is automatically assigned by the Mediator
                alert(this.name + " initialized.");
            },
            onFakeEvent: function() {
                someNumber++;
                alert("Handled " + someNumber + " times!");
            },
            onSetString: function(str) {
                someString = str;
                alert('Assigned ' + someString);
            }
        }
}());


Mediator.broadcast("Initialize");                 // alerts "TestObject initialized"
Mediator.broadcast('FakeEvent');                  // alerts "Handled 1 times!" (I know, bad grammar)
Mediator.broadcast('SetString', ['test string']); // alerts "Assigned test string"

Mediator.broadcast('FakeEvent');                  // alerts "Handled 2 times!"
Mediator.broadcast('SessionStart');               // this call is safely ignored
Mediator.broadcast('Translate', ['this is also safely ignored']);
