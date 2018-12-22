const mongoose = require("mongoose");

const video_schema  = mongoose.Schema({
	video_id: String,
	notes: [String],
	views: Number,
	viewersid: [String]
});

module.exports = mongoose.model("Video", video_schema);
