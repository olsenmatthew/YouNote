const mongoose = require("mongoose");

const user_schema  = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	name: String,
	email: String
});

module.exports = mongoose.model("User", user_schema);
