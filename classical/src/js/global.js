$('document').ready(function(){
	var Class = function(){
		var klass = function(){
			this.init.apply(this, arguments);
		};
		
		klass.prototype.init = function(){
			alert("new class instantiated");
		};
		return klass;
	};

	//Creating a class
	var Person = new Class;

	//Instantiating a person object
	var person = new Person;
});