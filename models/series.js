const mongoose = require("mongoose");

const series_schema  = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	series: String,
	videos: [String]
});

module.exports = mongoose.model("Series", series_schema);
