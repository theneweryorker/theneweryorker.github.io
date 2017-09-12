var wW;
var wH;
var transitionPageDelay = 800 + 50;

var scrollTop;
var currentPage;
var currentPageClass;
var currentProjectClass;
var brandPage = $('.navbar-brand .sub-page');
var footer = $('.footer');
var footerHeight;

var currentItem;
var currentScrollTop;
var projectItemClone;

var borderWidth;
var firstTime = true;

var touch = typeof window.ontouchstart !== 'undefined';
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
var $browser;


$(document).ready(function(){

	initHeaderFooter = function(){

		// this draws the loading animation

		var loaderTL = new TimelineMax({repeat:-1});
		loaderTL.set("#loaderpath", {drawSVG:"0%"})
		.to("#loaderpath", 0.8, {drawSVG:"0% 70%", ease:Power3.easeIn})
		.to("#loaderpath", 0.1, {drawSVG:"10% 80%", ease:Power3.easeNone})
		.to("#loaderpath", 0.1, {drawSVG:"20% 90%", ease:Power3.easeNone})
		.to("#loaderpath", 0.1, {drawSVG:"30% 100%", ease:Power3.easeOut})
		.to("#loaderpath", 0.8, {drawSVG:"100% 100%", ease:Power3.easeOut});

		$('.navbar-toggle').on('click', function(e){

			e.preventDefault();
			$('body').toggleClass('menuOpen');

			if(!$('body').hasClass('menuOpen')) {
				$(".navbar-toggle").trigger('mouseleave');
				if (is_iPad) { $('html').css({overflow:'auto', height:'auto'}); }
			} else {
				if (is_iPad) { $('html').css({overflow:'hidden', height:'100%'}); }
			}
		})
		$(".navbar-toggle").hover( function (e) {
		    $('body').toggleClass('menuHover', e.type === 'mouseenter');
		});
		$('.scrolltop').on('click', function(e){
			e.preventDefault();
			TweenLite.to($('body'), 0.8, {scrollTo:0, ease: Power3.easeInOut});
		});
		$('.menuColor').on('click',function(e){
			$('.navbar-toggle').trigger('click');
		})

//TOOK OUT CLOSE PROJECT + AJAX CALL

		TweenLite.ticker.addEventListener("tick", onScroll);



		function onScroll() {

			scrollTop = $(window).scrollTop();

			if ( scrollTop > wH && !$('.scrolltop').hasClass('showed') ) {
			 	$('.scrolltop').addClass('visible');
			} else {
				$('.scrolltop').removeClass('visible');
			}

			 if (scrollTop > $('.page-container').outerHeight() - window.innerHeight + borderWidth) {

			    if (wW > 768) {
				    TweenLite.to($('footer .briefLink'), 0, { y: - footerHeight * 1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 1) , ease: Linear.easeNone });
					TweenLite.to($('footer .contact'), 0, { y: - footerHeight * 0.5 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.5) , ease: Linear.easeNone });
					TweenLite.to($('footer .credits'), 0, { y: - footerHeight * 0.1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.1) , ease: Linear.easeNone });
				}
			    TweenLite.to($('.scrolltop'), 0, { y: - ( $('body').scrollTop() - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)), ease: Linear.easeNone });
				TweenLite.to($('.scrolldown'), 0, { y: - ( $('body').scrollTop() - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)), ease: Linear.easeNone });
				TweenLite.to($('.scrolldown'), 0, {css:{ opacity : 1 - (( $('body').scrollTop() - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)) * 0.01)}});

				/*if (!$('.footer').hasClass('show')) {
					$('.footer').addClass('show');
					footerTl.restart(0);
				};*/

			} else {
				if (wW > 768) {
					TweenLite.to($('footer .briefLink'), 0, { y: - footerHeight * 1 , ease: Linear.easeNone });
					TweenLite.to($('footer .contact'), 0, { y: - footerHeight * 0.5 , ease: Linear.easeNone });
					TweenLite.to($('footer .credits'), 0, { y: - footerHeight * 0.1 , ease: Linear.easeNone });
				}
				TweenLite.to($('.scrolltop'), 0, { y: 0 , ease: Linear.easeNone });
				TweenLite.to($('.scrolldown'), 0, { y: 0 , ease: Linear.easeNone });
				TweenLite.to($('.scrolldown'), 0, {css:{ opacity :1}});

				/*if ($('.footer').hasClass('show')) {
					$('.footer').removeClass('show');
				};*/

			}


		}

	};

	var tlHello;
	var tlPreambule;
	var preambuleText;
	var preambuleLines;
	var tlVision;
	var tlCreativity;
	var tlHomeIdeas;
	initHome = function(){

		console.log('Home Page initialised');
		$('body').addClass('showHello');

		///ANIMATIONS PREAMBULE
		tlHello = new TimelineLite({ paused: true});
		tlHello.staggerFrom($("#holly_h > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, 0.8);
-		tlHello.staggerFrom($("#holly_y > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "-=0.7");
-		tlHello.staggerFrom($("#holly_l1 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1.2");
-		tlHello.staggerFrom($("#holly_l2 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1");
-		tlHello.staggerFrom($("#holly_o > *"), 1.2, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "-=1.2");
-		tlHello.staggerFrom($("#holly_dot > *"), 0.6, {scale:0, transformOrigin:"50% 50%", ease:Power3.easeOut },  0.2, "-=0.8");
		tlHello.staggerFrom($(".hello-scrolldown"), 1.2, {bottom:-50, ease:Power3.easeOut },  0.2, "-=0.8");

		if($browser.name == "Safari" && $browser.version < 10) {
			tlHello.progress(1, false);
		} else {
			tlHello.play().timeScale(1);
		}

		tlPreambule= new TimelineLite({ paused: true});
		preambuleText = new SplitText(".preambule p", {type:"lines"});
		preambuleLines = preambuleText.lines;
		for(var i = 0; i<preambuleLines.length; i++){
		  preambuleLines[i].innerHTML = '<span>'+preambuleLines[i].innerHTML+'</span>';
		}
		tlPreambule.from(".preambule .block-title svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlPreambule.from(".preambule .block-title img", 1, {x:"-20%", opacity:0, ease:Power3.easeOut}, "-=0.60")
		tlPreambule.from(".preambule .block-title .mskd", 1, {x:"-60%", opacity:0, ease:Power3.easeOut}, "-=0.60");
		tlPreambule.staggerFrom($(preambuleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.05, "-=1.6");

		// var prllxVideoContainer = TweenLite.to(".video-container img", 1, { yPercent: 50, ease: Linear.easeNone, paused: true });

		//ANIMATIONS VISION
		tlVision = new TimelineLite({ paused: true});
		var visionTitleText = new SplitText(".vision h2 .txt", {type:"lines"});

		var visionTitleLines = visionTitleText.lines;
		// ^ an array of all the divs that wrap
		for(var i = 0; i<visionTitleLines.length; i++){
		  visionTitleLines[i].innerHTML = '<span>'+visionTitleLines[i].innerHTML+'</span>';
		}
		var visionIntroText = new SplitText(".vision .block-content p.intro", {type:"lines"});
		var visionIntroLines = visionIntroText.lines;
		for(var i = 0; i<visionIntroLines.length; i++){
		  visionIntroLines[i].innerHTML = '<span>'+visionIntroLines[i].innerHTML+'</span>';
		}
		// tlVision.from(".vision h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlVision.from(".vision .padding svg > *", 1.5, {drawSVG:"0%", ease:Power3.easeOut}, 0.4)
		tlVision.staggerFrom($(visionTitleLines).find('span'), 0.7, {y:"100%", ease: Power3.easeInOut},  0.08, "-=0.5");
		tlVision.staggerFrom($(visionIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		// tlVision.from(".vision .padding svg #pencil", 1.5, {drawSVG:"0%", ease:Power3.easeOut}, 0.6)

		tlVision.from(".vision .block-content p.intro + p", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		tlVision.from(".vision .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=0.8")
		TweenLite.set(".vision .skills-container", {y: '25%'});

		//y:25%

		var prllxVisionSills = TweenLite.to(".vision .skills-container", 2, { y: '15%', ease: Linear.easeNone, paused: true });


		//ANIMATIONS CREATIVITY
		// tlCreativity = new TimelineLite({ paused: true});
		// var creaTitleText = new SplitText(".creativity h2 .txt", {type:"lines"});
		// var creaTitleLines = creaTitleText.lines;
		// for(var i = 0; i<creaTitleLines.length; i++){
		//   creaTitleLines[i].innerHTML = '<span>'+creaTitleLines[i].innerHTML+'</span>';
		// }
		// var creaIntroText = new SplitText(".creativity .block-content p.intro", {type:"lines"});
		// var creaIntroLines = creaIntroText.lines;
		// for(var i = 0; i<creaIntroLines.length; i++){
		//   creaIntroLines[i].innerHTML = '<span>'+creaIntroLines[i].innerHTML+'</span>';
		// }
		// tlCreativity.from(".creativity .block-content p.intro + p", 0.5, {y:60, opacity:0, ease:Power3.easeOut}, 0.2)
		// tlCreativity.from(".creativity .project-container svg > *", 1.9, {drawSVG:"0%", ease:Power3.easeOut}, "-=1")
		//
		// // tlCreativity.from(".creativity .project-container svg > *", 2.2, {drawSVG:"0%", ease:Power3.easeOut}, "-=0.5")

		// tlCreativity.staggerFrom($(creaTitleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		// tlCreativity.staggerFrom($(creaIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		//
		// // tlCreativity.from(".creativity .block-content p.intro + p", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		// tlCreativity.from(".creativity .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		//
		// TweenLite.set(".creativity .block-content", {y: '25%'});
		// var prllxCreaContent = TweenLite.to(".creativity .block-content", 1, { yPercent: -25, ease: Linear.easeNone, paused: true });
		// var prllxVisuelProject = TweenLite.to(".project-container .project-visual img", 1, { yPercent: -50, ease: Linear.easeNone, paused: true });


		//ANIMATIONS IDEAS
		tlHomeIdeas = new TimelineLite({ paused: true});
		var ideasTitleText = new SplitText(".ideas h2 .txt", {type:"lines"});
		var ideasTitleLines = ideasTitleText.lines;
		for(var i = 0; i<ideasTitleLines.length; i++){
		  ideasTitleLines[i].innerHTML = '<span>'+ideasTitleLines[i].innerHTML+'</span>';
		}
		var ideasIntroText = new SplitText(".ideas .block-content p.intro", {type:"lines"});
		var ideasIntroLines = ideasIntroText.lines;
		for(var i = 0; i<ideasIntroLines.length; i++){
		  ideasIntroLines[i].innerHTML = '<span>'+ideasIntroLines[i].innerHTML+'</span>';
		}
		tlHomeIdeas.from(".ideas h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlHomeIdeas.staggerFrom($(ideasTitleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlHomeIdeas.staggerFrom($(ideasIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlHomeIdeas.staggerFrom(".ideas .block-content p.intro ~ p", 0.8, {y:60, opacity:0, ease:Power3.easeOut},  0.08, "-=1")
		tlHomeIdeas.from(".ideas .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		var prllxIdeasVisuel = TweenLite.to(".ideas .visuel-container img", 1, { yPercent: -50, ease: Linear.easeNone, paused: true });

		$('.animated').viewportChecker({
	  	  	repeat:false,
	  	  	offset:-100,
	  	  	callbackFunction: function(elem, action){

		  	  	if (elem.is('.vision')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlVision.play().timeScale(1);
					}
				}

				if (elem.is('.creativity')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlCreativity.play().timeScale(1);
					}
				}

				if (elem.is('.ideas')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlHomeIdeas.play().timeScale(1);
					}
				}

	  	  	}
  	  	});

		TweenLite.ticker.addEventListener("tick", onScroll);


		function onScroll() {

			scrollAmount = $(window).scrollTop();

			//ANIMATION PREAMBULE

			if (scrollAmount > 10 && $('body').hasClass('showHello')) {
				$('body').removeClass('showHello');
				tlPreambule.play().timeScale(1);
			} else if (scrollAmount <= 10 && !$('body').hasClass('showHello')){
				$('body').addClass('showHello');
				tlPreambule.reverse().timeScale(2);
			}

			if ( !$('body').hasClass('page-home') || wW < 768  ) {
				return;
			};

			//PRLLX PREAMBULE

			if (scrollAmount < $('.preambule').outerHeight() + wH) {
				$('.hello, .preambule').show();
			} else {
				$('.hello, .preambule').hide();
			}

			if (scrollAmount > $('.preambule').outerHeight() && scrollAmount < $('.preambule').outerHeight() + wH ) {

				TweenLite.to($('.hello'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 0.6 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 0.4 , ease: Linear.easeNone });
			} else {

				TweenLite.to($('.hello'), 0, { y: 0 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y: 0 , ease: Linear.easeNone });
			}


			//PARALLAX SKILLS
			var minSkills = $(".vision .skills-container").offset().top - wH;
			var maxSkills= $(".vision .skills-container").offset().top + $(".vision .skills-container").outerHeight();
			var normSkills = clamp(normalize(window.pageYOffset, minSkills, maxSkills), 0, 1);
			prllxVisionSills.progress(normSkills);

			//PARALLAX CREA CONTENT
			var minCrea = $(".creativity .block-content").offset().top - wH;
			var maxCrea= $(".creativity .block-content").offset().top + $(".creativity .block-content").outerHeight();
			var normCrea = clamp(normalize(window.pageYOffset, minCrea, maxCrea), 0, 1);
			prllxCreaContent.progress(normCrea);

			// var minProject = $(".project-container .project-visual").offset().top - wH;
			// var maxProject= $(".project-container .project-visual").offset().top + $(".project-container .project-visual").outerHeight();
			// var normProject = clamp(normalize(window.pageYOffset, minProject, maxProject), 0, 1);
			// prllxVisuelProject.progress(normProject);

			//PARALLAX IDEAS VISUEL
			var minIdeas = $(".ideas .visuel-container").offset().top - wH;
			var maxIdeas = $(".ideas .visuel-container").offset().top + $(".ideas .visuel-container").outerHeight();
			var normIdeas = clamp(normalize(window.pageYOffset, minIdeas, maxIdeas), 0, 1);
			prllxIdeasVisuel.progress(normIdeas);

		}


	};






	build = function(){

		TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.1});

		var targetURL = $('main.page').data( 'href' );
		// history.pushState({page:targetURL}, null, targetURL);

		$browser = checkNavigateur();

		FastClick.attach(document.body);

		$(window).on('resize',function(){
			wW = $(window).width();
			wH = $(window).height();
			footerHeight = footer.outerHeight();
			$('.page-container').css({marginBottom:footerHeight});
			calculBorderSize();
		});
		$(window).trigger('resize');

		initHeaderFooter();

        currentPage = $('main');
		var targetPageClass = currentPage.data('class');
		currentProjectClass = currentPage.data('project');
		$('body').addClass(targetPageClass).addClass(currentProjectClass).delay(800).queue(function(){

			TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.3});
			$(window).trigger('resize');
			initPage(targetPageClass);

			$(this).removeClass('loading').delay(800).queue(function(){
				$(this).addClass('loaded');
				$(this).dequeue();
			}).dequeue();

		});

		currentPageClass = targetPageClass;
	}

	build();

	function initPage(pageClass){

			$('.page-container').css({marginBottom:footerHeight});

			$('.menu-nav .active').removeClass('active');
			$('.menu-nav li a.'+pageClass+'-link').addClass('active');

			// without this, there's no menu
			if($('body').hasClass('first')) {
				$('body').delay(250).queue(function(){
					$(this).removeClass('first').dequeue();
				});
			}

			//initCurrentPage;
			switch(pageClass) {
				case 'page-home':
			        initHome();
			        break;
			    default:
			        return;
			}


		}


	function normalize(value, min, max) {
		return (value - min) / (max - min);
	}

	function clamp(value, min, max) {
		return value < min ? min : (value > max ? max : value);
	}

	function calculBorderSize() {

		switch (true) {
	    case (wW >= 1600) :
	        borderWidth =  60;
	    break;
	    case (992 >= 4 && wW < 1600) :
	        borderWidth = 40;
	    break;
	        borderWidth = 20;
	  	}

	};

	function checkNavigateur() {

		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion);
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
			browserName = "Opera";
			fullVersion = nAgt.substring(verOffset+6);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
			browserName = "Microsoft Internet Explorer";
			fullVersion = nAgt.substring(verOffset+5);
		}
		// In Chrome, the true version is after "Chrome"
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
			browserName = "Chrome";
			fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
			browserName = "Safari";
			fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox"
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
			browserName = "Firefox";
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
		          (verOffset=nAgt.lastIndexOf('/')) )
		{
			browserName = nAgt.substring(nameOffset,verOffset);
			fullVersion = nAgt.substring(verOffset+1);
		 if (browserName.toLowerCase()==browserName.toUpperCase()) {
		  browserName = navigator.appName;
		 }
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		   fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
		   fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);

		if (isNaN(majorVersion)) {
			fullVersion  = ''+parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion,10);
		}

		return {name : browserName, version : majorVersion};

	}

})




$(window).on('load', function (e) {
})
