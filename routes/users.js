const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res, next) => {
	User.find().exec().then(
		docs => {
			console.log("docs: "+docs);
			res.status(200).json(docs);
		}
	).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.post("/", (req, res, next) => {
	const user = new User({
		// id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email
	});
	user.save().then(result => {
		console.log("result: "+result);
		res.status(201).json({
			message: "successful login / account creation",
			myResult: result
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.get("/:user", (req, res, next) => {
	const uid = req.params.userId;
	User.findById(uid).exec().then(doc => {
		console.log(doc);
		if (doc) {
			res.status(200).json(doc);
		} else {
			res.status(404).json({message: "No valid data for given id"});
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

module.exports = router;
