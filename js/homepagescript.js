var $draggable, draggable2, draggable3;
$(document).ready( function() {

$("#title-responsive img#quote-mid").css("width",$(window).width()-($("#gg_face").width()+$("#gg_quote_left").width()+$("#gg_quote_right").width())-45+"px");

// try and get logo to the right

/*
	$("#instagram.focus a").click(function(e){
		e.preventDefault();
		window.open(
		  $(this).attr("href"),
		  '_blank' // <- This is what makes it open in a new window.
		);
	});

	$("#instagram a").click(function(e){
		e.preventDefault();
	});
*/
	$(window).click(function(e){
		//console.log(e);
	});

  //arrow-up starts out inactive; when you click up or
  //down it makes the arrows inactive or active (colored differently)
  //to tell you that there's more content up or down

	$("#about .arrow-up").addClass('inactive');
	$about_active = "summary";

	$("#about .arrow-down").click(function(){
		if($about_active=="summary"){
			$("#about .content").scrollTo($("#about-team"), 500);
			$("#about .arrow-up").removeClass('inactive');
			$about_active="team";
		} else if($about_active=="team") {
			$("#about .content").scrollTo($("#about-credits"), 500);
			$about_active="credits";
			$("#about .arrow-down").addClass('inactive');
		}
	});

	$("#about .arrow-up").click(function(){
		if($about_active=="credits"){
			$("#about .content").scrollTo($("#about-team"), 500);
			$("#about .arrow-down").removeClass('inactive');
			$about_active="team";
		} else if($about_active=="team") {
			$("#about .content").scrollTo($("#about-summary"), 500);
			$about_active="summary";
			$("#about .arrow-up").addClass('inactive');
		}
	});

  $('.textarea-scrollbar').scrollbar();

//don't care about twitter
	// $.getJSON("_/js/quotes.json", function(data){
	// 	$num_quotes = data.quotes.length;
	// 	$rand = Math.floor(Math.random() * $num_quotes);
	// 	$quote = data.quotes[$rand];
	// 	$("#quote-text").html($quote.text);
	// 	$("#quote-author").html($quote.author);
	// 	$("#quote-twitter").attr("href", "https://twitter.com/home?status="+$quote.text+" -"+$quote.handle+" %23GeekGirlsFilm");
	// });

//for future reference, structure json like this http://geekgirlsfilm.com/_/js/characters.json


//character information is in a json format
	// $.getJSON("_/js/characters.json", function(data){
  //
	// 	$num_chars = data.characters.length;
  //   //num_chars is the number of characters
	// 	$rand = Math.floor(Math.random() * $num_chars);
  //   //pick a random number (aka a random character)
	// 	$cur_char = $rand;
  //   //assign cur_char to that random number
  //
	// 	$character = data.characters[$cur_char];
  //   //find the character that is assigned to that number
  //
	// 	if(typeof $character.name != 'undefined'){
	// 		$("#character-name").show();
	// 		$("#character-name").html($character.name);
	// 	} else {
	// 		$("#character-name").hide();
	// 	}
  //
	// 	if(typeof $character.type != 'undefined'){
	// 		$("#character-type").show();
	// 		$("#character-type").html($character.type);
	// 	} else {
	// 		$("#character-type").hide();
	// 	}
  //
	// 	if(typeof $character.bio != 'undefined'){
	// 		$("#character-bio").show();
	// 		$("#character-bio").html($character.bio);
	// 	} else {
	// 		$("#character-bio").hide();
	// 	}
  //
	// 	if(typeof $character.part2 != 'undefined'){
	// 		$("#character-part2").show();
	// 		$("#character-part2").html($character.part2);
	// 	} else {
	// 		$("#character-part2").hide();
	// 	}
  //
	// 	$(".character-urls").html('');
	// 	if(typeof $character.links != 'undefined' && $character.links.length>0){
	// 		$.each($character.links, function(key, val){
	// 			$(".character-urls").append("<li><a href='"+val.url+"' target='_blank'><i class='fa fa-"+val.type+"' aria-hidden='true'></i></a></li>");
	// 		});
	// 	}
  //
	// 	if(typeof $character.shortname != 'undefined'){
	// 		$("#character-img-desktop img").attr("src", "_/img/characters/"+$character.shortname+".jpg");
	// 		$("#character-img-mobile img").attr("src", "_/img/characters/square/"+$character.shortname+".jpg");
	// 	}
  //
	// });
  //
	// $("#character .arrow-left").click(function(){
	// 	$("#character .content").scrollTop(0);
	// 	$.getJSON("_/js/characters.json", function(data){
	// 		$cur_char = $cur_char-1;
	// 		if($cur_char<0) $cur_char = $num_chars+$cur_char;
  //
	// 		$character = data.characters[$cur_char];
  //
	// 		$("#character-name").hide();
	// 		$("#character-type").hide();
	// 		$("#character-bio").hide();
	// 		$("#character-part2").hide();
	// 		$(".character-urls").hide();
  //
	// 		if(typeof $character.name != 'undefined'){
	// 			$("#character-name").fadeIn(400);
	// 			$("#character-name").html($character.name);
	// 		} else {
	// 			$("#character-name").hide();
	// 		}
  //
	// 		if(typeof $character.type != 'undefined'){
	// 			$("#character-type").fadeIn(400);
	// 			$("#character-type").html($character.type);
	// 		} else {
	// 			$("#character-type").hide();
	// 		}
  //
	// 		if(typeof $character.bio != 'undefined'){
	// 			$("#character-bio").fadeIn(400);
	// 			$("#character-bio").html($character.bio);
	// 		} else {
	// 			$("#character-bio").hide();
	// 		}
  //
	// 		if(typeof $character.part2 != 'undefined'){
	// 			$("#character-part2").fadeIn(400);
	// 			$("#character-part2").html($character.part2);
	// 		} else {
	// 			$("#character-part2").hide();
	// 		}
  //
	// 		$(".character-urls").html('');
	// 		if(typeof $character.links != 'undefined' && $character.links.length>0){
	// 			$.each($character.links, function(key, val){
	// 				$(".character-urls").append("<li><a href='"+val.url+"' target='_blank'><i class='fa fa-"+val.type+"' aria-hidden='true'></i></a></li>");
	// 			});
	// 		}
  //
	// 		$(".character-img img").hide();
  //
	// 		if(typeof $character.shortname != 'undefined'){
	// 			$("#character-img-desktop img").attr("src", "_/img/characters/"+$character.shortname+".jpg");
	// 			$("#character-img-mobile img").attr("src", "_/img/characters/square/"+$character.shortname+".jpg");
	// 		}
  //
	// 		$("#character-img-mobile img, #character-img-desktop img").on("load", function(){
	// 			$("#character-img-desktop img").fadeIn(400);
	// 			$("#character-img-mobile img").fadeIn(400);
	// 			$(".character-urls").fadeIn(400);
	// 		});
  //
  //
	// 	});
	// });
  //
	// $("#character .arrow-right").click(function(){
	// 	$("#character .content").scrollTop(0);
	// 	$.getJSON("_/js/characters.json", function(data){
	// 		$cur_char = $cur_char+1;
	// 		if($cur_char>=$num_chars) $cur_char = $cur_char - $num_chars;
  //
	// 		$character = data.characters[$cur_char];
  //
	// 		$("#character-name").hide();
	// 		$("#character-type").hide();
	// 		$("#character-bio").hide();
	// 		$("#character-part2").hide();
	// 		$(".character-urls").hide();
  //
	// 		if(typeof $character.name != 'undefined'){
	// 			$("#character-name").fadeIn(400);
	// 			$("#character-name").html($character.name);
	// 		} else {
	// 			$("#character-name").hide();
	// 		}
  //
	// 		if(typeof $character.type != 'undefined'){
	// 			$("#character-type").fadeIn(400);
	// 			$("#character-type").html($character.type);
	// 		} else {
	// 			$("#character-type").hide();
	// 		}
  //
	// 		if(typeof $character.bio != 'undefined'){
	// 			$("#character-bio").fadeIn(400);
	// 			$("#character-bio").html($character.bio);
	// 		} else {
	// 			$("#character-bio").hide();
	// 		}
  //
	// 		if(typeof $character.part2 != 'undefined'){
	// 			$("#character-part2").fadeIn(400);
	// 			$("#character-part2").html($character.part2);
	// 		} else {
	// 			$("#character-part2").hide();
	// 		}
  //
	// 		$(".character-urls").html('');
	// 		if(typeof $character.links != 'undefined' && $character.links.length>0){
	// 			$.each($character.links, function(key, val){
	// 				$(".character-urls").append("<li><a href='"+val.url+"' target='_blank'><i class='fa fa-"+val.type+"' aria-hidden='true'></i></a></li>");
	// 			});
	// 		}
  //
	// 		$(".character-img img").hide();
  //
	// 		if(typeof $character.shortname != 'undefined'){
	// 			$("#character-img-desktop img").attr("src", "_/img/characters/"+$character.shortname+".jpg");
	// 			$("#character-img-mobile img").attr("src", "_/img/characters/square/"+$character.shortname+".jpg");
	// 		}
  //
	// 		$("#character-img-mobile img, #character-img-desktop img").on("load", function(){
	// 			$("#character-img-desktop img").fadeIn(400);
	// 			$("#character-img-mobile img").fadeIn(400);
	// 			$(".character-urls").fadeIn(400);
	// 		});
  //
	// 	});
	// });



	var pageWidth = $(window).width();
	/*
	$(window).resize(function(){
		var pageWidth = $(window).width();
	});

  function mouse(e) {
		//getting mouse dimentions
		var pageX = event.pageX;
		var now = 40*(pageX - pageWidth/2)/pageWidth;

		$("#logo").css({
			transform: 'rotate(' + now + 'deg)'
		});
  }
  $(window).mousemove(mouse);
	*/
	$(".window").each(function(){
		$page_width = $(window).width()-340;
		$page_height = $(window).height();
		$width = $(this).width();
		$height = $(this).height();
		$x = Math.floor((Math.random() * ($page_width-$width)) + 1);
		$y = Math.floor((Math.random() * ($page_height-$height)) + 1);

//		console.log($x);
//		console.log($y);
		$(this).css('left',$x);
		$(this).css('top',$y);

		$(this).fadeIn();

//		$('#contact textarea').jScrollPane();


	});

	/*
	$(".window h3").mousedown(function(){
		$(this).mouseup(function(){
			if(!$(this).parent().hasClass("is-dragging")){
				$(this).parent().toggleClass("mini");
			}
			$(this).unbind('mouseup');
		});
	});
	*/



//this is all about mobile and we don't care!

	$("span.toggle").mousedown(function(){
		if(!$("body").hasClass('mobile')){
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

	z=0;

	$('.window, #logo').mousedown(function(){
		if(!$("body").hasClass('mobile')){
			if($(this).hasClass("focus")){
			} else {
				$(".window").removeClass('focus');
				$(this).addClass('focus');
			}
			z++;
			$(this).css('z-index',z);
		}
	});


});

$(window).resize(function(){
	$("#contact span.title").show();
	$("#contact span.email").hide();

	$("#title-responsive img#quote-mid").css("width",$(window).width()-($("#gg_face").width()+$("#gg_quote_left").width()+$("#gg_quote_right").width())-45+"px");
	if($(window).width()<=750){

		$(".window").removeClass("focus");

		if ($(".window").data('draggabilly')) {
			$draggable.draggabilly('destroy');
		}
		$("body").addClass("mobile");

		$('.mobile .window h3').unbind('tap');

		$('.mobile .window h3').on('tap', function(e){

			if($(this).parent().is("#twitter")){
				window.open('https://twitter.com/ginahara_','_blank');
				$(this).parent().removeClass("focus");
			} else if($(this).parent().is("#facebook")){
				window.open('https://facebook.com/geekgirlsfilm/','_blank');
				$(this).parent().removeClass("focus");
			} else if($(this).parent().is("#shop")){
				window.open('https://www.redbubble.com/people/geekgirls/','_blank');
				$(this).parent().removeClass("focus");
			} else if($(this).parent().is("#instagram")){
				window.open('https://www.instagram.com/gina_hara/','_blank');
				$(this).parent().removeClass("focus");
			} else if($(this).parent().is("#contact")){
				$(this).find("span.title").hide();
				$(this).find("span.email").show();
				$(this).parent().removeClass("focus");
			} else if($(this).parent().is("#trailer")){
				window.open('https://www.youtube.com/watch?v=LPEPgLgcVtE','_blank');
				$(this).parent().removeClass("focus");
			} else {
				if($(this).parent().hasClass("focus")){
					$(this).parent().removeClass("focus");
				} else {
					$(".window").removeClass('focus mini');
					$(this).parent().addClass('focus');
				}
				z++;
				$(this).parent().css('z-index',z);
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

		$draggable.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});

		$draggable2.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});

		$draggable3.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});
		$("body").removeClass("mobile");

	}

});

$(window).on("load", function(){
	if($(window).width()>750){
	  $draggable2 = $('#logo').draggabilly();
	  $draggable3 = $('#quote').draggabilly();
	  $draggable = $('.window').draggabilly({
			handle: 'h3'
	  	//containment:'body'
	  });

		$draggable.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});

		$draggable2.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});

		$draggable3.on( 'dragStart', function( event, pointer ) {
			$selected = $(event.target);
			$draggable.on( 'dragEnd', function( event, pointer ) {
				if(pointer.clientY<=0){
					$selected.css('top',0);
				}
			});
		});
	} else {
		if ($(".window").data('draggabilly')) {
			$draggable.draggabilly('destroy');
		}

		$("body").addClass("mobile");
	}

	$('.mobile span.toggle').bind('tap', function(e){
		//$(this).parent().parent().click();
	});

	$('.mobile .window').unbind('mousedown');

	$('.mobile .window h3').unbind('tap');

	$('.mobile .window h3').on('tap', function(e){

		if($(this).parent().is("#twitter")){
			window.open('https://twitter.com/ginahara_','_blank');
			$(this).parent().removeClass("focus");
		} else if($(this).parent().is("#facebook")){
			window.open('https://facebook.com/geekgirlsfilm/','_blank');
			$(this).parent().removeClass("focus");
		} else if($(this).parent().is("#shop")){
			window.open('https://www.redbubble.com/people/geekgirls/','_blank');
			$(this).parent().removeClass("focus");
		} else if($(this).parent().is("#instagram")){
			window.open('https://www.instagram.com/gina_hara/','_blank');
			$(this).parent().removeClass("focus");
		} else if($(this).parent().is("#contact")){
			$(this).find("span.title").hide();
			$(this).find("span.email").show();
			$(this).parent().removeClass("focus");
		} else if($(this).parent().is("#trailer")){
			window.open('https://www.youtube.com/watch?v=LPEPgLgcVtE','_blank');
			$(this).parent().removeClass("focus");
		} else {
			if($(this).parent().hasClass("focus")){
				$(this).parent().removeClass("focus");
			} else {
				$(".window").removeClass('focus mini');
				$(this).parent().addClass('focus');
			}
			z++;
			$(this).parent().css('z-index',z);
		}
	});
/*
	$(".mobile .window h3").click(function(){
		console.log("CLICK");
		$(this).parent().addClass("focus");
		$(this).parent().find(".content").show().css("overflow","scroll");
	});
*/


	setTimeout(function(){

/*		var W=0, H=0, X=0, Y=0;
		$(".iframe").each(function(i,el){
		   W = $(el).width();
		   H = $(el).height();
		   X = $(el).position().left;
		   Y = $(el).position().top;
		   $(this).after('<div class="overlay" />');
		    $(this).next('.overlay').css({
		        width: W,
		        height: H,
		        left: X,
		        top: Y
		    });
		});

		var mx = 0, my = 0;
		$('.overlay').on('mousemove click',function(e){
		    mx = e.clientX - $(this).position().left;
		    my = e.clientY - $(this).position().top;
		    $('#t').html(mx+' '+my);

		    if(e.type==='click'){
		        alert('clicked at: X='+mx+' Y='+my)
		    }
		});
*/

		$('#facebook iframe').iframeTracker({
			blurCallback: function(){
				z++;
				$("#facebook").css('z-index',z);
			}
		});

		$('#twitter iframe').iframeTracker({
			blurCallback: function(){
				z++;
				$("#twitter").css('z-index',z);
			}
		});

	},1000);
});


/*email*/
function isEmail(email) {
	var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return re.test(email);
}

$("#contactForm button[type=submit]").click(function(e){
	e.preventDefault();
	$yourEmail = $("input[name=yourEmail]").val();
	$yourMessage = $("textarea[name=yourMessage]").val();
	if($yourEmail!=""){
		window.open('mailto:info@geekgirlsfilm.com?subject=[geekgirlsfilm.com] Inquiry from '+$yourEmail+'&body='+$yourMessage,'_blank');
	} else {
		window.open('mailto:info@geekgirlsfilm.com?subject=[geekgirlsfilm.com]&body='+$yourMessage,'_blank');
	}
});
/*
$("#contactForm button[type=submit]").click(function(e){
	e.preventDefault();
	$yourEmail = $("input[name=yourEmail]").val();
	$yourMessage = $("textarea[name=yourMessage]").val();
	$yourLocation = $("input[name=yourLocation]").val();

	if (typeof $yourEmail != 'undefined' && $yourEmail !="" && isEmail($yourEmail) && typeof $yourMessage != 'undefined' && $yourMessage!=""){
		$("#contactForm .has-error").removeClass('has-error');
		$("#contactForm .help-block.with-errors").hide();
		$.post("index.php", {yourEmail:$yourEmail,yourMessage:$yourMessage,yourLocation:$yourLocation}, function(data, status){
		if(data==1) { alert("Your message was sent successfully. I will be in touch with you soon."); $("#contactForm")[0].reset(); }
			else { alert(data); }
		});
	} else {

		if(typeof $yourEmail == 'undefined' || $yourEmail == "") {
			$("input[name=yourEmail]").parent().addClass("has-error");
			$("input[name=yourEmail]").parent().find('.help-block.with-errors').show();
		} else {
			$("input[name=yourEmail]").parent().removeClass("has-error");
			$("input[name=yourEmail]").parent().find('.help-block.with-errors').hide();
		}

		if(typeof $yourMessage == 'undefined' || $yourMessage == ""){
			$("textarea[name=yourMessage]").parent().addClass("has-error");
			$("textarea[name=yourMessage]").parent().find('.help-block.with-errors').show();
		} else {
			$("textarea[name=yourMessage]").parent().removeClass("has-error");
			$("textarea[name=yourMessage]").parent().find('.help-block.with-errors').hide();
		}

		if(isEmail($yourEmail)==false){
			$("input[name=yourEmail]").parent().addClass("has-error");
			$("input[name=yourEmail]").parent().find('.help-block.with-errors').show();
		} else {
			$("input[name=yourEmail]").parent().removeClass("has-error");
			$("input[name=yourEmail]").parent().find('.help-block.with-errors').hide();
		}
	}
});
*/
