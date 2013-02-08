/* -- View Notes: ------------------------------------------------------------------------------------------------------------------------
* 	View is just representation for 1 element. 1 Slide. Not the slide container, not multiple slides, ect.. just 1 slide. 
* 	You may have a view for a slide, a view for the slide container, so on..
*
* 	The key is to build small chunks.
*
*/

define(['backbone'], function(){
	var Slide = Backbone.View.extend({
		className: 'slide',

		render: function(){
			this.$el.append(
				'<h1>' + this.model.get('title') + '</h1>'
			);
		}
	});

	return Slide;
});