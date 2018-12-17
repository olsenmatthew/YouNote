// initialize elements by id
var drop_menu = document.getElementById("drop_menu");
var logo = document.getElementById("logo");
var search_bar_input = document.getElementById("search_bar_input");
var search_bar_icon = document.getElementById("search_bar_icon");
var account_buttons_account = document.getElementById("account_buttons_account");
var account_buttons_notifications = document.getElementById("account_buttons_notifications");
var account_buttons_notes = document.getElementById("account_buttons_notes");
var wrapper = document.getElementById("wrapper");
var video_wrapper = document.getElementById("video_wrapper");
var video_iframe = document.getElementById("video_iframe");

// while(video_iframe == null) video_iframe = document.getElementById("video_iframe");

drop_menu.addEventListener("click", function show_hide_drop_menu() {

	console.log("drop menu clicked\n");

	if (document.getElementById("background_of_drop_menu")) {

		var background_of_drop_menu = document.getElementById("background_of_drop_menu");

		while(background_of_drop_menu.firstChild) {
			background_of_drop_menu.removeChild(background_of_drop_menu.firstChild);
		}

		background_of_drop_menu.remove();

	} else {

		var background_of_drop_menu = document.createElement("div");
		background_of_drop_menu.id = "background_of_drop_menu";
		background_of_drop_menu.className = "sidenav";

		var home = document.createElement("a");
		var home_text = document.createTextNode("Home\n");
		home.append(home_text);
		background_of_drop_menu.append(home);

		var trending = document.createElement("a");
		var trending_text = document.createTextNode("Trending\n");
		trending.append(trending_text);
		background_of_drop_menu.append(trending);

		var history = document.createElement("a");
		var history_text = document.createTextNode("History\n");
		history.append(history_text);
		background_of_drop_menu.append(history);

		var watch_later = document.createElement("a");
		var watch_later_text = document.createTextNode("Watch Later\n");
		watch_later.append(watch_later_text);
		background_of_drop_menu.append(watch_later);

		var following = document.createElement("a");
		var following_text = document.createTextNode("Following\n");
		following.append(following_text);
		background_of_drop_menu.append(following);

		var subscriptions = document.createElement("a");
		var subscriptions_text = document.createTextNode("Subscriptions\n");
		subscriptions.append(subscriptions_text);
		background_of_drop_menu.append(subscriptions);

		var settings = document.createElement("a");
		var settings_text = document.createTextNode("Settings\n");
		settings.append(settings_text);
		background_of_drop_menu.append(settings);

		var attatch_body = document.getElementById("attatch_body");
		attatch_body.append(background_of_drop_menu);

	}

});

logo.addEventListener("click", function logo_go_back_to_home() {

	console.log("logo clicked\n");

});

search_bar_icon.addEventListener("click", function search_for_video() {

	console.log("search clicked\n");

	var new_link = search_bar_input.value;
	if (new_link.length == 0) {
		console.log("Empty Search: Go Home");
	} else {

		if (new_link.includes("youtube.com/watch?v=")) {
			new_link = new_link.split("youtube.com/watch?v=").pop();
		}

		if (new_link.includes("&list")) {
			var playlist = new_link.split("&list")[1];
			console.log("&list"+playlist);
			new_link = new_link.split("&list")[0];
		}

		var prefix = "https://www.youtube.com/embed/";
		new_link = prefix + new_link;
		console.log(new_link);
		video_iframe.setAttribute("src", new_link);
		// document.location.reload(true);
		console.log("new video\n");
		search_bar_input.value = "";

	}

});

account_buttons_account.addEventListener("click", function show_hide_account_menu() {
	console.log("account menu clicked\n");
});

account_buttons_notifications.addEventListener("click", function show_hide_notifications() {
	console.log("notifications clicked\n");
});

account_buttons_notes.addEventListener("click", function show_hide_notes_history() {
	console.log("notes history clicked\n");
});
