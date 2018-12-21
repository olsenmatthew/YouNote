const mongoose = require("mongoose");

const video_schema  = mongoose.Schema({
	name: String,
	notes: [String],
	views: Number,
	viewersid: [String]
});

module.exports = mongoose.model("Video", video_schema);
