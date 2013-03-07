Mediator = (function()
{
        var debug = function() { /* console.log or air.trace as desired */ },
            members = {};

        var broadcast = function(event, args, source)
        {   
            var participant;

            if (!event) {
                return;
            }

            args = args || [];
            for (participant in members) {
                if (typeof members[participant]["on" + event] == "function") {
                    try {
                        source = source || members[participant];
                        members[participant]["on" + event].apply(source, args);
                    } catch (err) {
                        debug(["Mediator error.", event, args, source, err].join(' '));
                    }
                }
            }
        };        
        var addComponent = function(name, component, replaceDuplicate)
        {
            if(name in members) {
                if(replaceDuplicate) {
                    removeComponent(name);
                } else {
                    throw new Error('Mediator name conflict: ' + name);
                }
            }
            members[name] = component;
        };
        var removeComponent = function(name)
        {
            if (name in members) {
                delete members[name];
            }
        };
        var getComponent = function(name)
        {
            return members[name]; 
        };
        
        var contains = function(name)
        {
            return (name in members);
        };
        
        return {
            name      : "Mediator",
            broadcast : broadcast,
            add       : addComponent,
            rem       : removeComponent,
            get       : getComponent,
            has       : contains
        };
}
)();