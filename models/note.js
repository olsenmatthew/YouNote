const mongoose = require("mongoose");

const notes_schema  = mongoose.Schema({
	userId: String,
	videoId: String,
	playlistId: String,
	note_content: [{
		note_id: String,
		note_time: String
	}]
});

module.exports = mongoose.model("Note", notes_schema);
