/* Copyright 2023 Sergio Garcia Spaolonzi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

(function($) {
	var methods = {
		init : function(options) {
			return this.each(function() {
				var $this = $(this);
				var data = $this.data('jzoopraxiscope');
				if(!data) {
					var image = options.image;
					var widthImage = options.widthImage;
					var widthFrame = options.widthFrame;
					var height = options.height;

					//Set CSS to the Div where the animation will be placed
					$this.css({
						'width' : widthFrame,
						'height' : height,
						'overflow' : 'hidden',
						'padding' : '0px',
						'background-color' : 'transparent;',
						'background-image' : 'url(' + image + ')',
						'background-repeat' : 'repeat',
						'background-position' : '0 0',
						'background-attachment' : 'scroll',
						'box-shadow' : 'inset 0 0 40px #000000'
					});
					$this.data('jzoopraxiscope', {
						playing : false,
						fadePosition : -(widthImage * 4),
						widthFrame : widthFrame,
						widthImage : widthImage,
						position : 0
					});
				}
			});
		},
		play : function() {
			return this.each(function() {
				var $this = $(this);
				var data = $this.data('jzoopraxiscope');
				if(!data) {
					alert('You must initialize JZoopraxiscope before playing.');
				}
				if(!data.playing) {
					data.playing = true;
					$this.animate({
						backgroundPosition : data.fadePosition
					}, 7000, 'easeInQuint', function() {
						data.timer = setInterval(animationLoop, 50);
					});
					animationLoop = function() {
						$this.animate({
							backgroundPosition : data.position
						}, 1, 'linear', function() {
							data.position = data.position - data.widthFrame;
							if(data.position < -data.widthImage) {
								data.position = 0;
							}
						});
					}
				}
			});
		},
		stop : function() {
			return this.each(function() {
				var $this = $(this);
				var data = $this.data('jzoopraxiscope');
				if(data.playing) {
					clearInterval(data.timer);
					$this.stop(true);
					$this.animate({
						backgroundPosition : data.fadePosition
					}, 7000, 'easeOutQuint', function() {
						data.playing = false;
						$this.css({
							'background-position' : '0px'
						});
					});
				}
			})
		}
	};
	$.fn.jzoopraxiscope = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.zoo');
		}
	};
})(jQuery);
