#The Mediator Pattern Definition 
Overview: 
The mediator acts as a air traffic controller for the JavaScript APP.
The premise is all objects must talk through the mediator and not directly with each other. 
The mediator will then relay the messages and route them to whomever is supposed to get the message.
This type of architecture promotes loose coupling and adaptability. 

##High level overview: 
The Mediator is what is returned as a result of the method evaluation. The method executes as a IIFE ( SIAF )
and returns a facadé to the actual internal implementation of the Mediator object. The facadé doesnt really do much
except make some aliass in this case.

###members 
members are the participants in the event hub. You can think of them as the airplanes the tower is controlling.
To illustrate componets better, take a hypothetical banking application for instance. When building a banking app you will have all kinds of related objects. That list may look a little something like this: 

* Customer
* Employee
* Manager
* Account
* BankingProducts

ect... You get the idea.

Once we have a this list of players we then add them to the Mediator and tell our traffic control tower to look out for messages from each of these players until they stop being in a relationship with us.

members are represented internally as just an object that is composed of other objects. 

```js members = {}; ```

Below are the main ways we work with members: 

###addComponent 
Next up is ```addComponent``` it's how you add members to be tracked to the Mediator. 
This adds it to the Mediator's internal members object. Consult the implementaion readme to 
see how to add objects to the Mediator.
*  name: what the participant is called internally
*  participant: the arguments the event took
*  replaceDuplicate: to overwrite an existing value or not
*  exposed as: add

```js
var addComponent = function(name, participant, replaceDuplicate) {
    if(name in members) {
        if(replaceDuplicate) {
            removeComponent(name);
        } else {
            throw new Error('Mediator name conflict: ' + name);
        }
    }
    members[name] = participant;
};
```


###removeComponent 
The following is very simple. No further explanation needed.
```js
var removeComponent = function(name)
{
    if (name in members) {
        delete members[name];
    }
};
```
Since the Mediator returns a facadé and keeps things the internal implementation private it makes sense that we would have some 
convinence methods that would grant access to internal parts of the Mediator. That way we can inspect what kind of members we have and so forth. 

```js   
var getComponent = function(name) {
    return members[name]; // undefined if participant has not been added
};

var contains = function(name) {
    return (name in members);
};

var listComponents = function(this.members)
{
    //list members code.
}
```

So once you have added objects to the Mediator ( Controll Tower ), then you can broadcast events for them to listen too. This would be the air trafic controller telling planes to take off, the runway got swallowed by an earthquake, ect..  
     

###Broadcast
Broadcasting lets participating objects know that an event is taking place. 
Those would be objects that are in the Mediator. 

*  event: the event thats taking place. ( click, hover, custom event, ect...)
*  args:  the arguments the event took
*  source:
*  exposed as: broadcast

```js
var broadcast = function(event, args, source) {
    if (!event) {
        return;
    }
    args = args || [];
    for (var c in members) {
        if (typeof members[c]["on" + event] == "function") {
            try {
                source = source || members[c];
                members[c]["on" + event].apply(source, args);
            } catch (err) {
                debug(["Mediator error.", event, args, source, err].join(' '));
            }
        }
    }
};
```


###The Facadé - The public API 
The particular implementation for this module is the module revealing pattern. It has private inner workings and only 
returns the part of it that it wants people to see. The interface that the Mediator returns is a facade for the acutal private method names. 

```js
return {
    name      : "Mediator",
    broadcast : broadcast,
    add       : addComponent,
    rem       : removeComponent,
    get       : getComponent,
    has       : contains
};
``` 

That pretty much sums up the Mediator pattern.
 


####The Full Code

````markdown
Mediator = (function() {
        var debug = function() { /* console.log or air.trace as desired */ },
            members = {};

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
            for (var c in members) {
                if (typeof members[c]["on" + event] == "function") {
                    try {
                        //debug("Mediator calling " + event + " on " + c);
                        source = source || members[c];
                        members[c]["on" + event].apply(source, args);
                    } catch (err) {
                        debug(["Mediator error.", event, args, source, err].join(' '));
                    }
                }
            }
        };
        
        /* -- Add an participant to the internal members object ---------------------------------------------------------
        *  name:                what the participant is called internally
        *  participant:           the arguments the event took
        *  replaceDuplicate:    to overwrite an existing value or not
        *  exposed as:          add
        *----------------------------------------------------------------------------------------------------------------*/    
        var addComponent = function(name, participant, replaceDuplicate) {
            if(name in members) {
                if(replaceDuplicate) {
                    removeComponent(name);
                } else {
                    throw new Error('Mediator name conflict: ' + name);
                }
            }
            members[name] = participant;
        };
        
        var removeComponent = function(name) {
            if (name in members) {
                delete members[name];
            }
        };
        
        var getComponent = function(name) {
            return members[name]; // undefined if participant has not been added
        };
        
        var contains = function(name) {
            return (name in members);
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
````