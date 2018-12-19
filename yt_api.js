var window_width = window.innerWidth;
var player_width = window_width * .6;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

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

function onPlayerReady(event) {
	console.log("onPlayerReady");
	event.target.playVideo();
}

function onPlayerStateChange(event) {
	console.log("onPlayerStateChange");
	console.log(event.target);
}
