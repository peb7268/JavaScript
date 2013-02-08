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
 
