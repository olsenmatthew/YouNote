const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Note = require("../models/note");

router.post("/search", (req, res, next) => {
	var uid = req.session.user;
	if(!uid) {
		console.log("no session found error: " + err);
		return res.status(500).json({
			error: err
		});
	}
	var vidId = req.body.videoId;
	var playId = req.body.playlistId;

	Note.findOne({userId: uid, videoId: vidId, playlistId: playId}, (err, note) => {
		if (err) {
			console.log("note search error: "+err);
			return res.status(500).json({
				error: err
			});
		} else if (!note) {
			console.log("no note found: " + err);
			return res.status(404).json({
				error: err
			});
		} else {
			console.log("note found: " + note);
			return res.status(200).json({
				note: note
			});
		}
	});
});

router.post("/create", (req, res, next) => {

	var uid = req.session.user;
	if(!uid) {
		console.log("no session found error: " + err);
		return res.status(500).json({
			error: err
		});
	}
	var vidId = req.body.videoId;
	var playId = req.body.playlistId;
	var noteContent = req.body.note_content;

	const note = new Note({
		userId: uid,
		videoId: vidId,
		playlistId: playId,
		note_content: [noteContent]
	});

	note.save().then(result => {
		console.log("result: "+result);
		res.status(201).json({
			message: "created note",
			myResult: result
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

});

router.post("update", (req, res, next) => {

	var uid = req.session.user;
	var vidId = req.body.videoId;
	var playId = req.body.playlistId;
	var noteContent = req.body.note_content;

	const note = new Note({
		userId: uid,
		videoId: vidId,
		playlistId: playId,
		note_content: [noteContent]
	});

	note.save().then(() => {
		Note.findOne({userId: uid, videoId: vidId, playlistId: playId}).then((record) => {
			record.note_content.push({noteContent});
			record.save().then(() => {
				Note.findOne({userId: uid, videoId: vidId, playlistId: playId}).then((result) => {
					console.log("note after update: "+ result);
					done();
				});
			});
		});
	});

});

module.exports = router;
