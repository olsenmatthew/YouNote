const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/user");

//post user id
router.post("/register", (req, res, next) => {

	const user = new User({
		email: req.body.email,
		password: req.body.password
	});
	user.save().then(result => {
		console.log("result: "+result);
		req.session.user = user;
		res.status(201).json({
			message: "successful login",
			myResult: result
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

//log user in with given email and password
router.post("/login", (req, res) => {
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email: email, password: password}, (err, usr) => {
		if (err) {
			console.log("login error: "+err);
			return res.status(500).json({
				error: err
			});
		} else if (!usr) {
			console.log("no usr: " + err);
			return res.status(404).json({
				error: err
			});
		} else {
			console.log("logged in: " + usr);
			req.session.user = usr;
			return res.status(200).json({
				user: usr
			});
		}
	});
});

//search database to find a user with this email exists
router.post("/find_by_email", (req, res) => {
	var email = req.body.email;

	User.findOne({email: email}, (err, usr) => {
		if (err) {
			console.log("email search error: "+err);
			return res.status(500).json({
				error: err
			});
		} else if (!usr) {
			console.log("no user found with email: " + err);
			return res.status(404).json({
				error: err
			});
		} else {
			console.log("email found: " + usr);
			req.session.user = usr;
			return res.status(200).json({
				user: usr
			});
		}
	});
});

module.exports = router;
