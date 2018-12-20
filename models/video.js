const mongoose = require("mongoose");

const video_schema  = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	notes: [String],
	views: Number,
	viewersid: [String]
});

module.exports = mongoose.model("Video", video_schema);
