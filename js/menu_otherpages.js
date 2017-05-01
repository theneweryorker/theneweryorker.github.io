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

		// var loaderTL = new TimelineMax({repeat:-1});
		// loaderTL.set("#loaderpath", {drawSVG:"0%"})
		// .to("#loaderpath", 0.8, {drawSVG:"0% 70%", ease:Power3.easeIn})
		// .to("#loaderpath", 0.1, {drawSVG:"10% 80%", ease:Power3.easeNone})
		// .to("#loaderpath", 0.1, {drawSVG:"20% 90%", ease:Power3.easeNone})
		// .to("#loaderpath", 0.1, {drawSVG:"30% 100%", ease:Power3.easeOut})
		// .to("#loaderpath", 0.8, {drawSVG:"100% 100%", ease:Power3.easeOut});

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

		$('.menuColor').on('click',function(e){
			$('.navbar-toggle').trigger('click');
		})
  }

  build = function(){

		// TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.1});

		var targetURL = $('main.page').data( 'href' );
		// history.pushState({page:targetURL}, null, targetURL);

		// $browser = checkNavigateur();

		// FastClick.attach(document.body);

		$(window).on('resize',function(){
			wW = $(window).width();
			wH = $(window).height();
			footerHeight = footer.outerHeight();
			$('.page-container').css({marginBottom:footerHeight});
			// calculBorderSize();
		});
		$(window).trigger('resize');

		initHeaderFooter();
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
})

$(window).on('load', function (e) {
})
