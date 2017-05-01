

		(function($) {

			// var duration;
			// var $playhead = $('#playback');
			// var music = document.getElementById('music');

			// var timeUpdate = function() {
			// 	var playPercent = 100*(music.currentTime/duration);
			// 	$playhead.css('width',playPercent+'%');
			// }
			//
			// $(music).bind('timeupdate',timeUpdate);
			//
			// $(music).bind('canplaythrough',function(){
			// 	duration = music.duration;
			// 	$('#eq').show();
			// });

			var keycodes = {

				65:{'key':'a','src':'https://zarkafa.files.wordpress.com/2014/03/david-szakaly-organik-gif-1.gif?w=510'},
				66:{'key':'b','src':'http://assets.lookbookspro.com/bernstein-andriulli/gs_55fc75a9-a3b4-40cf-ae20-4a3f0a771fd0.gif'},
				67:{'key':'c','src':'https://media.giphy.com/media/3o7TKUMk1IysRprsis/giphy.gif'},
				68:{'key':'d','src':'http://bsnscb.com/data/out/86/40146011-gif-wallpapers.gif'},
				69:{'key':'e','src':'http://blog.europeana.eu/wp-content/uploads/2016/10/280-GIF.gif'},
				70:{'key':'f','src':'https://media.giphy.com/media/jzD2YI7EUGbN6/giphy.gif'},
				71:{'key':'g','src':'https://s-media-cache-ak0.pinimg.com/originals/c4/04/fc/c404fc12d55b16c3770d34a5af274f81.gif'},
				72:{'key':'h','src':'https://s-media-cache-ak0.pinimg.com/originals/f3/96/68/f3966861ae11e14f3f51ddbd62b37e4c.gif'},
				73:{'key':'i','src':'http://page-online.de/wp-content/uploads/2016/03/BI_160310_animierte_gifs_maerz_2016_naomi-wilkinson.gif'},
				74:{'key':'j','src':'http://www.juliewinegard.com/images/ballet.gif'}

			}

			var isTouch;

			var pressing = [];

			var imgPath = '';

			var $list = $('#display');
			var $display = $('#show-gif');
			var $loadingStatus = $('#status');

			var preloadImages = function() {

				// $loadingStatus.html('GIFs are loading, turn up your speakers.');

				var preload = [];
				var promises = [];

				$.each(keycodes,function(key,value) {
					if(value.src) {
						preload.push(imgPath+value.src);
					}
				});

				for(var i=0;i<preload.length;i++) {
					(function(url, promise) {
						var img = new Image();
						img.onload = function() {
							promise.resolve();
						};
						img.src = url;
					})(preload[i], promises[i] = $.Deferred());
				}

			// $.when says "when all promises are resolved, do something"
			// .apply calls a function with an array of arguments-- you can pass an array of an unknown number of parameters
				$.when.apply($, promises).done(function() {
					if(isTouch) {
						$loadingStatus.html('Press, hold & turn up the volume.');
					} else {
						$loadingStatus.html('Press keys & turn up your speakers.');
					}
				});

			}

			var handleKeydown = function(e) {


				var keycode = e.keyCode || e.which;

				if(keycode === '65' || '66' || '67' || '68' || '69'){
					console.log(keycode);
					$('section').css({'color':'white'});
				} else {
					$('section').css({'color':'black'});
				}

				if(keycodes[keycode] && !pressing[keycode]) {
					pressing[keycode] = { start:new Date }
					pressing[keycode].el = $('<li class="key-is-down"><span class="pressed-key" data-keycode="'+keycode+'">'+keycodes[keycode].key+'</span></li>');

					// .prepend() inserts the specified content as the first child of each element in the jQuery collection-- opposite of .append
					$list.prepend(pressing[keycode].el);
					$('body').addClass('gif-on');
					$display.css('background-image','url('+imgPath+keycodes[keycode].src+')').show();
					
				}

			}

			var handleKeyup = function(e) {

				$('section').css({'color':'black'});


				var keycode = e.keyCode || e.which;

				if(keycodes[keycode] && pressing[keycode]) {

					pressing[keycode].end = new Date;
					pressing[keycode].diff = pressing[keycode].end - pressing[keycode].start;

					pressing[keycode].el.removeClass('key-is-down').append('<span class="pressed-time" data-timedown="'+pressing[keycode].diff+'"> :: '+pressing[keycode].diff+'ms</span>');

					delete pressing[keycode];

					if(!$.isEmptyObject(pressing)){
						var $stillDown = $('.key-is-down',$list).first();
						var oldKeycode = $('.pressed-key',$stillDown).attr('data-keycode');
						$display.css('background-image','url('+imgPath+keycodes[oldKeycode].src+')');
					} else {
						$display.css('background-image','none').hide();
						$('body').removeClass('gif-on');
					}

				}

			}

			var handleTouchstart = function() {
				// music.play();0
				$('body').addClass('gif-on');
				var keycode = Math.floor(Math.random() * ((90-65)+1) + 65);
				$display.css('background-image','url('+imgPath+keycodes[keycode].src+')').show();
			}

			var handleTouchend = function() {
				$display.css('background-image','none').hide();
				$('body').removeClass('gif-on');
			}

			var is_touch_device = function() {
				return (('ontouchstart' in window)
				|| (navigator.MaxTouchPoints > 0)
				|| (navigator.msMaxTouchPoints > 0));
			}

			var init = function() {

				isTouch = is_touch_device();

				preloadImages();

				$('body').keydown(handleKeydown).keyup(handleKeyup);

				$(window).bind('touchstart',handleTouchstart).bind('touchend',handleTouchend);


			}

			init();

		})(jQuery);
