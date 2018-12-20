idseries_schemaconst mongoose = require("mongoose");

const notes_schema  = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	noteid: String,
	note_time: String,
	note_content: String
});

module.exports = mongoose.model("Note", notes_schema);
