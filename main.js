// initialize elements by id
var drop_menu = document.getElementById("drop_menu");
var logo = document.getElementById("logo");
var search_bar_input = document.getElementById("search_bar_input");
var search_bar_button = document.getElementById("search_bar_button");
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

// resize note_box elements to fit YT video frame
window.addEventListener("resize", resizeNotesElementsBasedOnVideoSize());
resizeNotesElementsBasedOnVideoSize();
// setTimeout(askForLogin(), 500);
askForLogin();
populateSessionNotes();

// create left sidenav
drop_menu.addEventListener("click", show_hide_sidenav);

logo.addEventListener("click", logo_button);

// read text from search bar search_bar_input
// use text to get info (video name, videoId, playlist id)
// update the YT player and then post data to database
search_bar_button.addEventListener("click", search_for_video);

// create popup with two forms (login and registration)
// take users input and post to database to login or create a new account
account_buttons_account.addEventListener("click", show_account_menu);

account_buttons_notifications.addEventListener("click", show_hide_notifications);

// get video Notes
// if response contains Notes and no error
// format notes
// for each new note, add a bullet point and space
// format uses coordinate system, \n is not to be used
account_buttons_notes.addEventListener("click", show_hide_notes_history);

//save notes from write_note_textarea, then clear write_note_textarea
//post the notes data to database along with video information
save_note_button.addEventListener("click", post_written_note);

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

	// console.log("video notes height: "+video_and_notes_height);

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
		// console.log(response);
		value = response;
	}).catch(error => {
		// console.log("post data error: "+error);
	});

	// console.log("data: "+ value.status);
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

// create the first note for this user id and the video id
async function createVideoNote(videoId=``, playlistId=``, note_data={}) {

	var note_destination = document.location + "info/posts/notes/create";

	// console.log("videoId: " + videoId);

	var response = await postData(note_destination, {
		videoId: videoId,
		playlistId: playlistId,
		note_content: note_data
	});

	// console.log("get video notes: " + response);

	return response;

}

//update user's notes for this video (updates content)
async function updateVideoNote(videoId=``, playlistId=``, note_data={}) {

	var note_destination = document.location + "info/posts/notes/update";

	// console.log("videoId: " + videoId);

	var response = await postData(note_destination, {
		videoId: videoId,
		playlistId: playlistId,
		note_content: note_data
	});

	// console.log("get video notes: " + response);

	return response;

}

// search for video notes with this video id
async function getVideoNotes(videoId=``) {

	var note_destination = document.location + "info/posts/notes/search";
	// console.log("videoId: "+videoId);
	var response = await postData(note_destination, {
		videoId: videoId
	});

	// console.log("get video notes: " + response);

	return response;

}

// return true or false as to whether the notes exist
async function areNotesAvailable(videoId=``) {

	var response = await getVideoNotes(videoId);
	// console.log("are notes availble" + response.ok);
	return response.ok;

}

// get notes for this video
// check for error, if error, do nothing
// else append each new not to note_logs
async function populateNotes(videoId) {

	if (areNotesAvailable(videoId)) {
		var response = await getVideoNotes(videoId);
		response.json().then((data) => {
			if (!data.error) {
				// console.log(data);
				data.note.note_content.sort(noteCompareByTime);
				for(var i = 0; i < data.note.note_content.length; i++) {
					// console.log(data.note.note_content[i]);
					appendNewNote(data.note.note_content[i].note_text);
				}
			}
		});
	}

}

//compare note object by time for sorting function
function noteCompareByTime(note1 , note2) {

	var first_time = parseInt(note1.note_time);
	var second_time = parseInt(note2.note_time);

	if (first_time < second_time) {
		return -1;
	}
	if (first_time > second_time) {
		return 1;
	}
	return 0;

}

// append new note to note_logs
function appendNewNote(note_text=``) {

	var new_note = document.createElement("div");
	new_note.className = "note my_content";

	var user_note = document.createElement("div");
	user_note.className = "user_note";

	var user_note_text = document.createTextNode(note_text);
	user_note.append(user_note_text);

	console.log(note_text);

	new_note.append(user_note);
	note_logs.append(new_note);

}

// change the session storage key for the videoId
function setSessionVideoId(videoId=``) {
	window.localStorage.setItem("videoId", videoId);
}

// test if the user is in a session
async function isInSession() {
	var note_destination = document.location + "info/posts/users/session";

	var response = await postData(note_destination, {
		session: "?"
	});
	console.log(response.ok);
	return response.ok;
}

// if user is not in current session, show_account_menu();
async function askForLogin() {
	var shouldAsk = await isInSession();
	if(!shouldAsk) {
		show_account_menu();
	}
}

// if user is logged in and session video exists
async function populateSessionNotes() {
	var inSession = await isInSession();
	if (inSession && window.localStorage.getItem("videoId")) {
		populateNotes(window.localStorage.getItem("videoId"));
	}
}

// create popup with two forms (login and registration)
// take users input and post to database to login or create a new account
function show_account_menu() {

	// console.log("account menu clicked\n");

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

		var login_email_label = document.createElement("b");
		var login_email_label_text = document.createTextNode("Email: ");
		login_email_label.style.color = "#FFFFFF";
		login_email_label.append(login_email_label_text);
		div_form_group.append(login_email_label);

		var login_email = document.createElement("input");
		login_email.className = "form_control";
		login_email.type = "email";
		login_email.placeholder="example@gmail.com"
		login_email.value = "";
		div_form_group.append(login_email);

		var div_form_group2 = document.createElement("div");
		div_form_group2.className = "form_group";
		div_inner_left.append(div_form_group2);

		var login_password_label = document.createElement("b");
		var login_password_label_text = document.createTextNode("Password: ");
		login_password_label.style.color = "#FFFFFF";
		login_password_label.append(login_password_label_text);
		div_form_group2.append(login_password_label);

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

		var register_email_label = document.createElement("b");
		var register_email_label_text = document.createTextNode("Email: ");
		register_email_label.style.color = "#FFFFFF";
		register_email_label.append(register_email_label_text);
		div_form_group5.append(register_email_label);

		var register_email = document.createElement("input");
		register_email.className = "form_control";
		register_email.type = "text";
		register_email.placeholder="example@gmail.com"
		register_email.value = "";
		div_form_group5.append(register_email);

		var div_form_group6 = document.createElement("div");
		div_form_group6.className = "form_group";
		div_inner_right.append(div_form_group6);

		var register_password_label = document.createElement("b");
		var register_password_label_text = document.createTextNode("Password: ");
		register_password_label.style.color = "#FFFFFF";
		register_password_label.append(register_password_label_text);
		div_form_group6.append(register_password_label);

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
				// console.log(response.status);

				if (response.ok) {
					removeElementAndChildrenById("background_of_login_create");
					populateNotes(yt_player.getVideoData()['video_id']);
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
					// console.log(response.status);

					if (response.ok) {
						removeElementAndChildrenById("background_of_login_create");
					}

				} else {
					window.alert("Account with that email exists");
				}

			}

		});

	}

}

//save notes from write_note_textarea, then clear write_note_textarea
//post the notes data to database along with video information
async function post_written_note() {

	var note_text = write_note_textarea.value;
	console.log(note_text);
	if (note_text.match(/\S+/i)) {

		var num = yt_player.getCurrentTime();
		var videoId = yt_player.getVideoData()['video_id'];
		var playlistId = yt_player.getPlaylistId();
		var note_data = {note_text: note_text, note_time: num};

		var update = await areNotesAvailable(videoId);
		console.log("Should Update: "+update);
		if (update) {
			updateVideoNote(videoId, playlistId, note_data);
		} else {
			createVideoNote(videoId, playlistId, note_data);
		}

		appendNewNote(note_text);

	}

	write_note_textarea.value = "";

}

// get video Notes
// if response contains Notes and no error
// format notes
// for each new note, add a bullet point and space
// format uses coordinate system, \n is not to be used
async function show_hide_notes_history() {

	// get video notes
	var videoId = yt_player.getVideoData()['video_id'];

	if (areNotesAvailable(videoId)) {

		var response = await getVideoNotes(videoId);

		response.json().then((data) => {

			if (!data.error && data.note != undefined) {

				data.note.note_content.sort(noteCompareByTime);

				var pdfDoc = new jsPDF();

				pdfDoc.setFontSize(12);
				var pageHeight = pdfDoc.internal.pageSize.height;
				var pageWidth = pdfDoc.internal.pageSize.width;

				var x = 10;
				var y = 10;
				var lines = 0;
				var spacing = 5;

				for(var i = 0; i < data.note.note_content.length; i++) {

					var formated_note = pdfDoc.splitTextToSize(data.note.note_content[i].note_text, pageWidth);
					for (var k = 0; k < formated_note.length; k++) {

						var text = formated_note[k];

						if (k === 0) {
							text = '\u2022 ' + formated_note[k];
							lines++;
						}

						y = 10 + (lines*spacing);
						y = y % pageHeight;
						pdfDoc.text(x, y, text);
						if (y >= pageHeight-spacing*2) {
							pdfDoc.addPage();
							lines+= 3;
							y = spacing*2;
						}
						lines++;

					}

				}

				pdfDoc.save("notes.pdf");

			}

		});

	}

}

// create left sidenav
function show_hide_sidenav() {

	// console.log("drop menu clicked\n");

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

}

function logo_button() {

	// console.log("logo clicked\n");

}

function show_hide_notifications() {
	// console.log("notifications clicked\n");
}

// read text from search bar search_bar_input
// use text to get info (video name, videoId, playlist id)
// update the YT player and then post data to database
function search_for_video() {

	// console.log("search clicked\n");

	var new_link = search_bar_input.value;
	if (new_link.length !== 0) {

		var data_sections = new_link.split("&");
		// console.log(data_sections);

		var time = "";
		var playlist = "";
		var playlist_index = "";

		for (var i = 0; i < data_sections.length; i++) {

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

		yt_player.loadVideoById({videoId:new_link});

		while(note_logs.firstChild) {
			note_logs.removeChild(note_logs.firstChild);
		}

		// console.log("new video\n");
		search_bar_input.value = "";
		write_note_textarea.value = "";

		populateNotes(new_link);
		setSessionVideoId(new_link);

	}

}
