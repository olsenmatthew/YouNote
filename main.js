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

// getVideoNotes();

//resize note_box elements to fit YT video frame
window.addEventListener("resize", resizeNotesElementsBasedOnVideoSize());
resizeNotesElementsBasedOnVideoSize();
//create left sidenav
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

// read text from search bar search_bar_input
// use text to get info (video name, videoId, playlist id)
// update the YT player and then post data to database
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

// create popup with two forms (login and registration)
// take users input and post to database to login or create a new account
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

		var login_email = document.createElement("input");
		login_email.className = "form_control";
		login_email.type = "email";
		login_email.placeholder="example@gmail.com"
		login_email.value = "";
		div_form_group.append(login_email);

		var div_form_group2 = document.createElement("div");
		div_form_group2.className = "form_group";
		div_inner_left.append(div_form_group2);

		var login_password = document.createElement("input");
		login_password.className = "form_control";
		login_password.type = "text";
		login_password.placeholder="Password"
		login_password.value = "";
		div_form_group2.append(login_password);

		var div_form_group3 = document.createElement("div");
		div_form_group3.className = "form_group";
		div_inner_left.append(div_form_group3);

		var login_button = document.createElement("input");
		login_button.value = "Login";
		login_button.type = "submit";
		div_form_group3.append(login_button);

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

		var register_account_right_title = document.createElement("h3");
		var register_account_right_title_text = document.createTextNode("Create Account");
		register_account_right_title.append(register_account_right_title_text);
		div_inner_right.append(register_account_right_title);

		var div_form_group5 = document.createElement("div");
		div_form_group5.className = "form_group";
		div_inner_right.append(div_form_group5);

		var register_email = document.createElement("input");
		register_email.className = "form_control";
		register_email.type = "text";
		register_email.placeholder="example@gmail.com"
		register_email.value = "";
		div_form_group5.append(register_email);

		var div_form_group6 = document.createElement("div");
		div_form_group6.className = "form_group";
		div_inner_right.append(div_form_group6);

		var register_password = document.createElement("input");
		register_password.className = "form_control";
		register_password.type = "text";
		register_password.placeholder="Password"
		register_password.value = "";
		div_form_group6.append(register_password);

		var div_form_group7 = document.createElement("div");
		div_form_group7.className = "form_group";
		div_inner_right.append(div_form_group7);

		var register_button = document.createElement("input");
		register_button.value = "Create Account";
		register_button.type = "submit";
		div_form_group7.append(register_button);

		var div_form_group8 = document.createElement("div");
		div_form_group8.className = "form_group";
		div_inner_right.append(div_form_group8);

		var register_forgot_password = document.createElement("a");
		var register_forgot_password_text = document.createTextNode("Forgot Password?");
		register_forgot_password.className = "buttonForgotPassword";
		register_forgot_password.href = "#";
		register_forgot_password.append(register_forgot_password_text);
		div_form_group8.append(register_forgot_password);

		var attatch_body = document.getElementById("attatch_body");
		attatch_body.append(background_of_login_create);
		setTimeout(function(){
		    RemoveOnForeignClick("background_of_login_create");
		}, 500);

		login_button.addEventListener("click", async function login_user() {
			var email = login_email.value;
			var password = login_password.value;
			email = email.trim();
			password = password.trim();

			if (email.length <= 1 || !email.includes("@")) {
				window.alert("Please enter a valid email");
			} else if (password.length < 8 || password.length > 16) {
				window.alert("Please enter a valid password \n Length of 8 to 16 characters");
			} else {

				var login_destination = document.location + "info/posts/users/login";
				var response = await postData(login_destination, {
					email: email,
					password: password
				});
				console.log(response.status);

				if (response.ok) {
					removeElementAndChildrenById("background_of_login_create");
				}

			}

		});

		register_button.addEventListener("click", async function register_user() {

			var email = register_email.value;
			var password = register_password.value;
			email = email.trim();
			password = password.trim();

			if (email.length <= 1 || !email.includes("@")) {
				window.alert("Please enter a valid email");
			} else if (password.length < 8 || password.length > 16) {
				window.alert("Please enter a valid password \n Length of 8 to 16 characters");
			} else {

				var search_destination = document.location + "info/posts/users/find_by_email";
				var response = await postData(search_destination, {
					email: email
				});

				if (!response.ok) {
					var register_destination = document.location + "info/posts/users/register";
					response = await postData(register_destination, {
						email: email,
						password: password
					});
					console.log(response.status);

					if (response.ok) {
						removeElementAndChildrenById("background_of_login_create");
					}

				} else {
					window.alert("Account with that email exists");
				}

			}

		});

	}

});

account_buttons_notifications.addEventListener("click", function show_hide_notifications() {
	console.log("notifications clicked\n");
});

account_buttons_notes.addEventListener("click", function show_hide_notes_history() {

	console.log("notes history clicked\n");
	getVideoNotes();

});

//save notes from write_note_textarea, then clear write_note_textarea
//post the notes data to database along with video information
save_note_button.addEventListener("click", function post_written_note() {

	var note_text = write_note_textarea.value;
	if (note_text.match(/\S+/i)) {

		console.log(response);

		var num = yt_player.getCurrentTime();
		console.log("current time: "+num);

		note_text = note_text + "\n" + "time: " + num;

		var new_note = document.createElement("div");
		new_note.className = "note my_content";

		var user_note = document.createElement("div");
		user_note.className = "user_note";

		//TODO: FINISH NOTE POSTING CONDITIONS
		var note_destination = document.location + "info/posts/notes/update";
		var videoId = yt_player.getVideoData()['video_id'];
		var playlistId = yt_player.getPlaylistId();
		// var note_data = JSON.stringify({note_id: note_text,	note_time: num});
		var note_data = {note_id: note_text,	note_time: num};
		console.log(note_data);
		var response = postData(note_destination, {
			videoId: videoId,
			playlistId: playlistId,
			note_content: note_data
		});

		var user_note_text = document.createTextNode(note_text);
		user_note.append(user_note_text);

		new_note.append(user_note);
		note_logs.append(new_note);

	}

	write_note_textarea.value = "";

});

// remove element and children when click occurs in document that is not contained by the given id
function RemoveOnForeignClick(id) {

	if (document.getElementById(id)) {

		var element = document.getElementById(id);

		const outsideClickListener = event => {
			if(!element.contains(event.target)) {
				while(element.firstChild) {
					element.removeChild(element.firstChild);
				}
				element.remove();
			}
		}

		const removeClickListener = () => {
        	document.removeEventListener('click', outsideClickListener)
    	}

    	document.addEventListener('click', outsideClickListener)

	}

}

//resize note_box elements to fit YT video frame
function resizeNotesElementsBasedOnVideoSize() {

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

// accept url and data, post data to url in json information
// wait for response and return response
async function postData(url = ``, data = {}) {
	var value = '';
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=UTF-8"
		},
		body: JSON.stringify(data)
	}).then(response => {
		console.log(response);
		value = response;
		response.json();
	}).catch(error => {
		console.log("post data error: "+error);
	});
	return value;
}

// accept id of element, if exists, remove children and element
function removeElementAndChildrenById(id) {
	if (document.getElementById(id)) {
		var element = document.getElementById(id);
		while(element.firstChild) {
			element.removeChild(element.firstChild);
		}
		element.remove();
	}
}

async function getVideoNotes() {
	var note_destination = document.location + "info/posts/notes/search";
	var videoId = yt_player.getVideoData()['video_id'];
	console.log("videoId: "+videoId);
	// var playlistId = yt_player.playlist;
	var response = await postData(note_destination, {
		videoId: videoId
		// playlistId: playlistId
	});

	console.log("get video notes: "+response);
}
