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


