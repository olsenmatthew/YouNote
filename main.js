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
			// TODO: save playlist to database
			console.log("&list"+playlist);
			new_link = new_link.split("&list")[0];
		}

		var prefix = "https://www.youtube.com/embed/";
		new_link = prefix + new_link;
		console.log(new_link);
		// TODO: save video to database along with playlist
		video_iframe.setAttribute("src", new_link);
		// document.location.reload(true);
		console.log("new video\n");
		search_bar_input.value = "";

	}

});

account_buttons_account.addEventListener("click", function show_hide_account_menu() {

	console.log("account menu clicked\n");


		if (document.getElementById("background_of_login_create")) {

			var background_of_login_create = document.getElementById("background_of_login_create");

			while(background_of_login_create.firstChild) {
				background_of_login_create.removeChild(background_of_login_create.firstChild);
			}

			background_of_login_create.remove();

		} else {

			var background_of_login_create = document.createElement("div");
			background_of_login_create.id = "background_of_login_create";
			background_of_login_create.className = "login_container";

			var div_outer = document.createElement("div");
			div_outer.className = "row_login_create";
			background_of_login_create.append(div_outer);

			var div_inner_left = document.createElement("div");
			div_inner_left.className = "col-md-6 login_form_left";
			div_outer.append(div_inner_left);

			// login form
			var left_title = document.createElement("h3");
			var left_title_text = document.createTextNode("Login");
			left_title.append(left_title_text);
			div_inner_left.append(left_title);

			var div_form_group = document.createElement("div");
			div_form_group.className = "form_group";
			div_inner_left.append(div_form_group);

			var input_email = document.createElement("input");
			input_email.className = "form_control";
			input_email.type = "text";
			input_email.placeholder="example@gmail.com"
			input_email.value = "";
			div_form_group.append(input_email);

			var div_form_group2 = document.createElement("div");
			div_form_group2.className = "form_group";
			div_inner_left.append(div_form_group2);

			var input_password = document.createElement("input");
			input_password.className = "form_control";
			input_password.type = "text";
			input_password.placeholder="Password"
			input_password.value = "";
			div_form_group2.append(input_password);

			var div_form_group3 = document.createElement("div");
			div_form_group3.className = "form_group";
			div_inner_left.append(div_form_group3);

			var submit_button = document.createElement("input");
			submit_button.value = "Login";
			submit_button.type = "submit";
			div_form_group3.append(submit_button);

			var div_form_group4 = document.createElement("div");
			div_form_group4.className = "form_group";
			div_inner_left.append(div_form_group4);

			var forgot_password = document.createElement("a");
			var forgot_password_text = document.createTextNode("Forgot Password?");
			forgot_password.className = "buttonForgotPassword";
			forgot_password.href = "#";
			forgot_password.append(forgot_password_text);
			div_form_group4.append(forgot_password);

			// create account form
			var div_inner_right = document.createElement("div");
			div_inner_right.className = "col-mid-6 login_form_right";
			div_outer.append(div_inner_right);

			var create_account_right_title = document.createElement("h3");
			var create_account_right_title_text = document.createTextNode("Create Account");
			create_account_right_title.append(create_account_right_title_text);
			div_inner_right.append(create_account_right_title);

			var div_form_group5 = document.createElement("div");
			div_form_group5.className = "form_group";
			div_inner_right.append(div_form_group5);

			var create_email = document.createElement("input");
			create_email.className = "form_control";
			create_email.type = "text";
			create_email.placeholder="example@gmail.com"
			create_email.value = "";
			div_form_group5.append(create_email);

			var div_form_group6 = document.createElement("div");
			div_form_group6.className = "form_group";
			div_inner_right.append(div_form_group6);

			var create_password = document.createElement("input");
			create_password.className = "form_control";
			create_password.type = "text";
			create_password.placeholder="Password"
			create_password.value = "";
			div_form_group6.append(create_password);

			var div_form_group7 = document.createElement("div");
			div_form_group7.className = "form_group";
			div_inner_right.append(div_form_group7);

			var create_button = document.createElement("input");
			create_button.value = "Create Account";
			create_button.type = "submit";
			div_form_group7.append(create_button);

			var div_form_group8 = document.createElement("div");
			div_form_group8.className = "form_group";
			div_inner_right.append(div_form_group8);

			var create_forgot_password = document.createElement("a");
			var create_forgot_password_text = document.createTextNode("Forgot Password?");
			create_forgot_password.className = "buttonForgotPassword";
			create_forgot_password.href = "#";
			create_forgot_password.append(create_forgot_password_text);
			div_form_group8.append(create_forgot_password);

			var attatch_body = document.getElementById("attatch_body");
			attatch_body.append(background_of_login_create);
			setTimeout(function(){
			    removeOnForeignClick("background_of_login_create");
			}, 500);

		}

});

account_buttons_notifications.addEventListener("click", function show_hide_notifications() {
	console.log("notifications clicked\n");
});

account_buttons_notes.addEventListener("click", function show_hide_notes_history() {

	console.log("notes history clicked\n");

});

function removeOnForeignClick(id) {

	if (document.getElementById(id)) {

		var element = document.getElementById(id);

		const outsideClickListener = event => {
			if(!element.contains(event.target)) {
				while(element.firstChild) {
					element.removeChild(element.firstChild);
				}
				element.remove();
				// removeElementAndChildren(id);
			}
		}

		const removeClickListener = () => {
        	document.removeEventListener('click', outsideClickListener)
    	}

    	document.addEventListener('click', outsideClickListener)

	}

}

// function removeElementAndChildren(id) {
//
// 	if (document.getElementById(id)) {
// 		var element = document.getElementById(id);
// 		while(element.firstChild) {
// 			element.removeChild(element.firstChild);
// 		}
// 		element.remove();
// 	}
// 	return;
//
// }
