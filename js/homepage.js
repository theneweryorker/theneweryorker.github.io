var $draggable, draggable2, draggable3;

$(function () {
	var pageWidth = $(window).width();

	//this is all about mobile and we don't care!

	$("span.toggle").mousedown(function () {
		if (!$("body").hasClass('mobile')) {
			$(this).parent().parent().toggleClass("mini");
		}
	});



	/*
	$("span.toggle").mousedown(function(){
		$(this).mouseup(function(){
			if(!$(this).parent().parent().hasClass("is-dragging")){
				$(this).parent().parent().toggleClass("mini");
			}
			$(this).unbind('mouseup');
		});
	});
	*/

	z = 0;

	$('.window, #logo').mousedown(function () {
		if (!$("body").hasClass('mobile')) {
			if ($(this).hasClass("focus")) {
			} else {
				$(".window").removeClass('focus');
				$(this).addClass('focus');
			}
			z++;
			$(this).css('z-index', z);
		}
	});


});

$(window).resize(function () {
	$("#contact span.title").show();
	$("#contact span.email").hide();

	$("#title-responsive img#quote-mid").css("width", $(window).width() - ($("#gg_face").width() + $("#gg_quote_left").width() + $("#gg_quote_right").width()) - 45 + "px");
	if ($(window).width() <= 750) {

		$(".window").removeClass("focus");

		if ($(".window").data('draggabilly')) {
			$draggable.draggabilly('destroy');
		}
		$("body").addClass("mobile");

		$('.mobile .window h3').unbind('tap');

		$('.mobile .window h3').on('tap', function (e) {

			if ($(this).parent().is("#twitter")) {
				window.open('https://twitter.com/ginahara_', '_blank');
				$(this).parent().removeClass("focus");
			} else if ($(this).parent().is("#facebook")) {
				window.open('https://facebook.com/geekgirlsfilm/', '_blank');
				$(this).parent().removeClass("focus");
			} else if ($(this).parent().is("#shop")) {
				window.open('https://www.redbubble.com/people/geekgirls/', '_blank');
				$(this).parent().removeClass("focus");
			} else if ($(this).parent().is("#instagram")) {
				window.open('https://www.instagram.com/gina_hara/', '_blank');
				$(this).parent().removeClass("focus");
			} else if ($(this).parent().is("#contact")) {
				$(this).find("span.title").hide();
				$(this).find("span.email").show();
				$(this).parent().removeClass("focus");
			} else if ($(this).parent().is("#trailer")) {
				window.open('https://www.youtube.com/watch?v=LPEPgLgcVtE', '_blank');
				$(this).parent().removeClass("focus");
			} else {
				if ($(this).parent().hasClass("focus")) {
					$(this).parent().removeClass("focus");
				} else {
					$(".window").removeClass('focus mini');
					$(this).parent().addClass('focus');
				}
				z++;
				$(this).parent().css('z-index', z);
			}
		});
	} else {
		$('.mobile .window h3').unbind('tap');

		$draggable2 = $('#logo').draggabilly();
		$draggable3 = $('#quote').draggabilly();
		$draggable = $('.window').draggabilly({
			handle: 'h3'
			//containment:'body'
		});

		$draggable.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});

		$draggable2.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});

		$draggable3.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});
		$("body").removeClass("mobile");

	}

});

$(window).on("load", function () {
	if ($(window).width() > 750) {
		$draggable2 = $('#logo').draggabilly();
		$draggable3 = $('#quote').draggabilly();
		$draggable = $('.window').draggabilly({
			handle: 'h3'
			//containment:'body'
		});

		$draggable.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});

		$draggable2.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});

		$draggable3.on('dragStart', function (event, pointer) {
			$selected = $(event.target);
			$draggable.on('dragEnd', function (event, pointer) {
				if (pointer.clientY <= 0) {
					$selected.css('top', 0);
				}
			});
		});
	} else {
		if ($(".window").data('draggabilly')) {
			$draggable.draggabilly('destroy');
		}

		$("body").addClass("mobile");
	}

	$('.mobile span.toggle').bind('tap', function (e) {
		//$(this).parent().parent().click();
	});

	$('.mobile .window').unbind('mousedown');

	$('.mobile .window h3').unbind('tap');

	$('.mobile .window h3').on('tap', function (e) {

		if ($(this).parent().is("#twitter")) {
			window.open('https://twitter.com/ginahara_', '_blank');
			$(this).parent().removeClass("focus");
		} else if ($(this).parent().is("#facebook")) {
			window.open('https://facebook.com/geekgirlsfilm/', '_blank');
			$(this).parent().removeClass("focus");
		} else if ($(this).parent().is("#shop")) {
			window.open('https://www.redbubble.com/people/geekgirls/', '_blank');
			$(this).parent().removeClass("focus");
		} else if ($(this).parent().is("#instagram")) {
			window.open('https://www.instagram.com/gina_hara/', '_blank');
			$(this).parent().removeClass("focus");
		} else if ($(this).parent().is("#contact")) {
			$(this).find("span.title").hide();
			$(this).find("span.email").show();
			$(this).parent().removeClass("focus");
		} else if ($(this).parent().is("#trailer")) {
			window.open('https://www.youtube.com/watch?v=LPEPgLgcVtE', '_blank');
			$(this).parent().removeClass("focus");
		} else {
			if ($(this).parent().hasClass("focus")) {
				$(this).parent().removeClass("focus");
			} else {
				$(".window").removeClass('focus mini');
				$(this).parent().addClass('focus');
			}
			z++;
			$(this).parent().css('z-index', z);
		}
	});
});


/*email*/
function isEmail(email) {
	var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return re.test(email);
}

$("#contactForm button[type=submit]").click(function (e) {
	e.preventDefault();
	$yourEmail = $("input[name=yourEmail]").val();
	$yourMessage = $("textarea[name=yourMessage]").val();
	if ($yourEmail != "") {
		window.open('mailto:info@geekgirlsfilm.com?subject=[geekgirlsfilm.com] Inquiry from ' + $yourEmail + '&body=' + $yourMessage, '_blank');
	} else {
		window.open('mailto:info@geekgirlsfilm.com?subject=[geekgirlsfilm.com]&body=' + $yourMessage, '_blank');
	}
});


/* TEXT FADE IN ANIMATION CODE */
$(function () {
	for (x = 1; x <= 17; x++) {
	  var class_name = ".line" + x
	  var delay_time = 100 * x

	  $(class_name).delay(delay_time).animate({ opacity: 1 }, 700);
	}
  });


  /* DRAWING CODE */
var drawingApp = (function () {

	"use strict";
	
	var canvasWidth = $("#canvasContainer").width(),
	  canvasHeight = $("#canvasContainer").height(),
	  clearButton = document.getElementById('btnClear'),
	  clickX = [],
	  clickY = [],
	  clickDrag = [],
	  paint,
	  canvas,
	  canvasBounds,
	  context,

	  // Resizes the canvas.
	  resizeCanvas = function () {

		canvasWidth = $("#canvasContainer").width();
		canvasHeight = $("#canvasContainer").height();
		canvasBounds = document.getElementById("canvas").getBoundingClientRect();
		console.log(canvasBounds)

		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);

		/**
		* Your drawings need to be inside this function otherwise they will be reset when 
		* you resize the browser window and the canvas goes will be cleared.
		*/
		redraw();
	  },

	  // Clears the canvas.
	  clearCanvas = function () {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	  },

	  // Erase all actions.
	  eraseAll = function () {

		clickX = [];
		clickY = [];
		clickDrag = [];
		clearCanvas();

	  },

	  // Redraws the canvas.
	  redraw = function () {

		clearCanvas();

		var radius = 8;
		context.strokeStyle = "#FF0000";
		context.lineJoin = "round";
		context.lineWidth = radius;

		for (var i = 0; i < clickX.length; i++) {
		  context.beginPath();
		  if (clickDrag[i] && i) {
			context.moveTo(clickX[i - 1], clickY[i - 1]);
		  } else {
			context.moveTo(clickX[i] - 1, clickY[i]);
		  }
		  context.lineTo(clickX[i], clickY[i]);
		  context.closePath();
		  context.stroke();
		}
	  },

	  // Adds a point to the drawing array.
	  // @param x
	  // @param y
	  // @param dragging
	  addClick = function (x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	  },

	  // Add mouse and touch event listeners to the canvas
	  createUserEvents = function () {

		var press = function (e) {
		  // Mouse down location
		  paint = true
		  addClick(e.pageX - canvasBounds.left, e.pageY - canvasBounds.top, false);
		  redraw();
		},

		drag = function (e) {
		  if (paint) {
			addClick(e.pageX - canvasBounds.left, e.pageY - canvasBounds.top, true);
			redraw();
		  }
		  // Prevent the whole page from dragging if on mobile
		  e.preventDefault();
		},

		release = function () {
		  paint = false;
		  redraw();
		},

		cancel = function () {
		  paint = false;
		}

		// Add mouse event listeners to canvas element
		canvas.addEventListener("mousedown", press, false);
		canvas.addEventListener("mousemove", drag, false);
		canvas.addEventListener("mouseup", release);
		canvas.addEventListener("mouseout", cancel, false);

		// Add touch event listeners to canvas element
		canvas.addEventListener("touchstart", press, false);
		canvas.addEventListener("touchmove", drag, false);
		canvas.addEventListener("touchend", release, false);
		canvas.addEventListener("touchcancel", cancel, false);

	  },

	  /**
	  * Creates a canvas element.
	  */
	  init = function () {

		// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
		canvas = document.createElement('canvas');
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('id', 'canvas');
		document.getElementById('canvasContainer').appendChild(canvas);
		if (typeof G_vmlCanvasManager !== "undefined") {
		  canvas = G_vmlCanvasManager.initElement(canvas);
		}
		context = canvas.getContext("2d");
		canvasBounds = document.getElementById("canvas").getBoundingClientRect();
		createUserEvents();
		
		// clearButton.addEventListener("mousedown", eraseAll, false);
		window.addEventListener("resize", resizeCanvas);
		//refresh canvas 
		$('.window').on('dragEnd', function () {
		  canvasBounds = document.getElementById("canvas").getBoundingClientRect();
		});
	  };

	return {
	  init: init
	};

  }());
  drawingApp.init();