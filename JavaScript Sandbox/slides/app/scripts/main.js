//require = use it now
//define  = use it now and register it as a dependency for later use.
require.config({
  shim: {
  	"backbone": {
  		deps: ['underscore', 'jquery'],
  		exports: 'Backbone'
  	}
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: '../components/backbone/backbone',
    underscore: '../components/underscore/underscore'
  }
});
 
/** -- Sample Implementation -- **/

// require(['models/slide'], function(SlideModel){
// 	console.log( new SlideModel({ title: "My First Modular App" }) );
// });

require(['models/slide', 'views/slide'], function(SlideModel, SlideView){
  var slide     = new SlideModel({ title: 'My First Slide' });
  var slideView = new SlideView({ model: slide });
  slideView.render();
  console.log(slideView.el);
});