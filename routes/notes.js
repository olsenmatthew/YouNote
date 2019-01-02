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

	Note.findOne({userId: uid, videoId: vidId}).then((note, err) => {
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

	console.log("create function");

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
		return res.status(201).json({
			message: "created note",
			myResult: result
		});
	}).catch(err => {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	});

});

router.post("/update", (req, res, next) => {

	console.log("create function");

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

	console.log("update content: "+noteContent.note_text);

	Note.findOne({userId: uid, videoId: vidId, playlistId: playId}).then((record) => {
		record.note_content.push(noteContent);
		record.save().then(() => {
			console.log("note is updated: " + record);
			return res.status(201).json({
				result: record
			});
		});
	}).catch(err => {
		console.log("update error: " + err);
		return res.status(500).json({
			error: err
		});
	});

});

module.exports = router;
