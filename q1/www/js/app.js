/*-----------------------------------------------------------------------------------------
 * Functions.js
 *-----------------------------------------------------------------------------------------*/
/**
 * Main js functions
 *
 * @author Alexandre Barfuhok <a@doublechee.se>
 */

/*-----------------------------------------------------------------------------------------
 * Properties
 *-----------------------------------------------------------------------------------------*/
//Define section
var INTRO1 = 1;
var INTRO2 = 2;
var EPISODES = 3;
var PLAYER = 4;
var FOLLOWUS = 5;
var CREDITS = 6;
var ABOUT = 7;

var currentSection = INTRO2;
var currentMenu;


/*-----------------------------------------------------------------------------------------
 * Functions
 *-----------------------------------------------------------------------------------------*/
$(function() {
	//Active menu
	currentMenu = $("#menu .episodes");

	//Default ease
	jQuery.easing.def = "easeInOutCubic";


	$(".intros").css("display", "none");
	$(".introVideo").show();
	//Load video and auto play
    $('.introVideo').flash({
		swf: 'assets/vid/intro.swf',
		width:$(window).width(),
		height:($(window).width()/1.7777777777777777777777777777778)
	});
    $(".introVideo").delay(1400).fadeOut(500);
    $(".overlay").delay(1400).fadeIn(1).fadeOut(1500);
	$("#menu").delay(1400).fadeIn(1000);
	switchSection(EPISODES);

	//Animate mouseover and mouseout on project elements
	$(".projectHover").mouseover(function(){
		var animVal = parseInt($(this).closest('.projectItem').attr("rel"), 10) * 100;
		$(this).parent().children(".projectBg").stop(true,true).animate({ opacity: 1 }, 100);
		//$(this).parent().children(".projectTextWrapper").children(".projectTitle").children(".normalState").stop(false,true).fadeOut(500);
		$(this).parent().children(".projectTextWrapper").children(".projectTitle").children(".hoverState").stop(false,true).fadeIn(500);
		$(this).parent().children(".projectTextWrapper").children(".projectTitle").children(".normalState").stop(false,true).fadeOut(500);
		$(this).parent().children(".projectTextWrapper").children(".projectId").children(".normalState").stop(false,true).animate({ opacity: 0 }, 200);
		$(this).parent().children(".projectTextWrapper").children(".projectId").children(".hoverState").stop(false,true).animate({ opacity: 1 }, 200);
		$("#bgItemHolder").css("top", -animVal+"%");
		$("#bgWrapper").stop(true, true).fadeOut(0).fadeIn(500);

	})
	$(".projectHover").mouseout(function(){
		$(this).parent().children(".projectBg").stop(true,true).animate({ opacity: 0 }, 100);
		$(this).parent().children(".projectTextWrapper").children(".projectTitle").children(".hoverState").stop(false,true).fadeOut(500);
		$(this).parent().children(".projectTextWrapper").children(".projectTitle").children(".normalState").stop(false,true).fadeIn(500);
		$(this).parent().children(".projectTextWrapper").children(".projectId").children(".normalState").stop(false,true).animate({ opacity: 1 }, 200);
		$(this).parent().children(".projectTextWrapper").children(".projectId").children(".hoverState").stop(false,true).animate({ opacity: 0 }, 200);
	})

	$(".projectHover").click(function(){
		switchSection(PLAYER, $(this).parent().attr("rev"));
	})
	$(".introNext").click(function(){
		$(".introVideo").show();
		 $('.introVideo').flash({
			swf: 'assets/vid/intro.swf',
			width:$(window).width(),
			height:($(window).width()/1.7777777777777777777777777777778),
			bgcolor: '#000000'
		});
		$("#intro2 div a.introNext").hide();
		$(".introVideo").delay(1400).fadeOut(500);
		$(".overlay").delay(1400).fadeIn(1).fadeOut(1500);
	})

	//Navigate through projects up and down with the mousemove
	$("body").mousemove(function(event) {
		var target = null;
		var ratioMenu1;
		var ratioMenu2;
		var windowHeight = $(window).height()-$("#menu").height();

		if(currentSection == EPISODES) {
			target = $("#projectsWrapper");
			ratioMenu1 = 0.06;
			ratioMenu2 = 0;
		}
		if(currentSection == CREDITS) {
			target = $("#creditsWrapper");
			ratioMenu1 = 0;
			ratioMenu2 = -0.06;
		}
		if(target == null) return 0;

		var startZone = windowHeight / 100 * 5;
		var endZone = windowHeight / 100 * 95;
		if(event.pageY > startZone && event.pageY < endZone) {
			var ratioPan = -0.07;
			//if(event.pageY < $(window).height()/2) ratioPan = -ratioPan;
			var ratio = event.pageY / ($(window).height()-($(window).height()/5)) + ratioPan;
			var newMargin = (-target.height() + windowHeight) * ratio;
			target.css("top", newMargin);
		}
	});

	//Set mouseover and mouseout on menu items
	$("#menu a").mouseover(function(){
		if(!$(this).hasClass("active")) $(this).stop(true,true).animate({ backgroundPosition: "0 -62px" }, 400);
	})
	$("#menu a").mouseout(function(){
		if(!$(this).hasClass("active")) $(this).stop(true,true).animate({ backgroundPosition: "0 0" }, 400);
	})
	$("#menu a").click(function(){
		if($(this).attr("rel")==5){}
		else if(!$(this).hasClass("active")) {
			currentMenu.removeClass("active");
			currentMenu.mouseout();
			$(this).addClass("active");
			currentMenu = $(this);
			switchSection($(this).attr("rel"))
		}
	})
});

/**
 * {switchSection} This function is used to dynamically switching section on this website.
 *
 */
function switchSection(sectionId, blipLink) {
	if(sectionId == PLAYER) {

		$('#playerEmbed').html(
			'<iframe src="//player.vimeo.com/video/'+blipLink+'?autoplay=1&rel=0&color=191916&portrait=0&title=0" width="'+($(window).width() - 35)+'" height="'+($(window).height() - 110)+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		);
	}
	if(sectionId == EPISODES)  $("#intros").fadeOut(1500);
	$(".section_"+currentSection).fadeOut(1000, function() {
		if(currentSection >= 3 && currentSection <= 5 && sectionId >= 6){
			if(sectionId == CREDITS)  {
				$("#creditsOverlay").show();
				$("#credits").show();
				$("#creditsOverlay").animate({ height: "0"}, 1000, function() {
					$("#creditsOverlay").hide();
					$("#creditsOverlay").css("height", "100%");
				});
			}
			$("#menu").animate({ bottom: ($(window).height() - 62)+"px"}, 1000, function() {
				$("#menu").css("bottom", "auto");
				$("#menu").css("top", "0");
				fadeSection(sectionId, blipLink);
			});
			return 0;
		}
		if(currentSection >= 6 && sectionId <= 5){
			$("#menu").animate({ top: ($(window).height() - 62)+"px"}, 1000, function() {
				$("#menu").css("bottom", "0");
				$("#menu").css("top", "auto");
				fadeSection(sectionId, blipLink);
			});
			return 0;
		}



		fadeSection(sectionId, blipLink);
	});
}

/**
 * {fadeSection} This function is the continuity of the above section.
 *
 */
function fadeSection(sectionId, blipLink) {

	if(sectionId == INTRO2) {
		$("#intro2 div a.introNext").delay(del+3000).fadeIn(1500);
		$(".section_"+sectionId).delay(2500).fadeIn(1000);
	} else {
		$(".section_"+sectionId).fadeIn(1000);
	}
	if(currentSection == PLAYER) setTimeout("$('#playerEmbed').empty();", 1000);
	currentSection = sectionId;
}

/**
 * {getUpdate} Called when blip.tv video end.
 *
 */
function getUpdate(type, arg1, arg2) {
	if (type=="complete") {
        switchSection(EPISODES);
    }
}
