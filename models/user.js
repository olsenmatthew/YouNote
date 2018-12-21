const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	password: String,
	email: String
});

module.exports = mongoose.model("User", user_schema);
