const mongoose = require("mongoose");

const series_schema  = mongoose.Schema({
	name: String,
	series: String,
	videos: [String]
});

module.exports = mongoose.model("Series", series_schema);
