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
var note_box = document.getElementById("note_box");
var note_box_title = document.getElementById("note_box_title");
var note_logs = document.getElementById("note_logs");
var note_form = document.getElementById("note_form");
var write_note_textarea = document.getElementById("write_note_textarea");
var save_note_button = document.getElementById("save_note_button");
var yt_player = YT.get("video_iframe");

window.addEventListener("resize", resizeElements());

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

		var data_sections = new_link.split("&");
		console.log(data_sections);

		var time = "";
		var playlist = "";
		var playlist_index = "";

		// TODO: save index of playlist
		// TODO: save video to database along with playlist
		// TODO: save playlist to database

		for(var i = 0; i < data_sections.length; i++) {

			if (data_sections[i].includes("v=")) {

				new_link = data_sections[i].split("v=").pop();

			} else if (data_sections[i].includes("t=")
				&& !data_sections[i].includes("list=")) {

				time = data_sections[i].split("t=").pop();

			} else if (data_sections[i].includes("list=")) {

				playlist = data_sections[i].split("list=").pop();

			} else if (data_sections[i].includes("index=")) {

				playlist_index = data_sections[i].split("index=").pop();

			}

		}

		console.log("new_link: " + new_link);
		console.log("time: " + time);
		console.log("playlist: " + playlist);
		console.log("playlist_index: " + playlist_index);

		yt_player.loadVideoById({videoId:new_link});

		while(note_logs.firstChild) {
			note_logs.removeChild(note_logs.firstChild);
		}

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

save_note_button.addEventListener("click", function post_written_note() {

	var note_text = write_note_textarea.value;
	if (note_text.match(/\S+/i)) {

		var num = yt_player.getCurrentTime();
		console.log("current time: "+num);

		 note_text = note_text + "\n" + "time: " + num;

		var new_note = document.createElement("div");
		new_note.className = "note my_content";

		var user_note = document.createElement("div");
		user_note.className = "user_note";

		var user_note_text = document.createTextNode(note_text);
		user_note.append(user_note_text);

		new_note.append(user_note);
		note_logs.append(new_note);

	}

	write_note_textarea.value = "";

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

function resizeElements() {

	var video_and_notes_height = video_iframe.clientHeight;

	console.log("video notes height: "+video_and_notes_height);

	note_box.style.height = video_and_notes_height+"px";

	note_box_title.style.height = (video_and_notes_height*.05)+"px";
	note_box_title.style.fontSize = (video_and_notes_height*.025)+"px";

	note_logs.style.height = (video_and_notes_height*.75)+"px";

	note_form.style.height = (video_and_notes_height*.2)+"px";

	write_note_textarea.style.height = (video_and_notes_height*.1)+"px";
	write_note_textarea.style.margin = (video_and_notes_height*.025)+"px";
	write_note_textarea.style.fontSize = (video_and_notes_height*.025)+"px";

	save_note_button.style.height = write_note_textarea.clientHeight+"px";
	save_note_button.style.margin = (video_and_notes_height*.025)+"px";
	save_note_button.style.fontSize = (video_and_notes_height*.025)+"px";

}
