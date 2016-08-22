(function($){
	var trigger = 'click';
	$.fn.flipsie = function(options) {
		if(!options && this.hasClass('flip')) {
			this.toggleClass('isFlipped');
		} else {
			var settings = $.extend({
				depth: true,
				trigger: 'click',
				frontFace: '.flip__front',
				backFace: '.flip__back'
			}, options);

			return this.each(function(){
				var flipPerspective = (settings.depth) ? 'flip--3d' : 'flip--2d';

				$(this).children().wrapAll('<div class="flip__control" />');

				$(this).addClass('flip');

				if(settings.trigger === 'hover') $(this).addClass('flip--hover');

				$(this).addClass(flipPerspective);

				if(settings.frontFace !== '.flip__front') $(settings.frontFace).addClass('flip__front');
				if(settings.backFace !== '.flip__back') $(settings.backFace).addClass('flip__back');
			});
		}
	};


	$(function(){
		$('.flip:not(.flip--hover)').click(function(){$(this).flipsie()});
		$('.flip--hover').hover(function(){$(this).flipsie()});
	})

})(jQuery);