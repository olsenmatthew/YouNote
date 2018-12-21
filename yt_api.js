// get window dimensions
var window_width = window.innerWidth;
var player_width = window_width * .6;

// create script tag to import youtube's iframe api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// player will be a YT.player object
var player;

// initialize player, set default videoId, and set even functions for each event
function onYouTubeIframeAPIReady() {
	player = new YT.Player('video_iframe', {
		width : window_width,
		height : window_width / 2,
		videoId: "yCChR2HgCgc",
		events: {
		  'onReady': onPlayerReady,
		  'onStateChange': onPlayerStateChange
		}
	});
	var tag_main = document.createElement("script");
	tag_main.src = "main.js";
	document.getElementById("body").append(tag_main);
}

// play video when ready
function onPlayerReady(event) {
	console.log("onPlayerReady");
	event.target.playVideo();
}

// manage different video events
function onPlayerStateChange(event) {
	console.log("onPlayerStateChange");
	console.log(event.target);
}
