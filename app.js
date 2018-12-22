const express = require('express');
var path = require("path")
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

// info routes
const userRoutes = require("./routes/users");
const noteRoutes = require("./routes/notes");

// connect to mongodb atlas
mongoose.connect("mongodb://YouNotePublic:YouNotePublic@younote-shard-00-00-qkm9p.mongodb.net:27017,younote-shard-00-01-qkm9p.mongodb.net:27017,younote-shard-00-02-qkm9p.mongodb.net:27017/test?ssl=true&replicaSet=YouNote-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true});

// serve static files in YouNote directory
app.use(express.static(__dirname));

// send index.html on "website/" path
app.get("/", function(req, res) {
	res.sendFile("index.html", {root: path.join(__dirname, "")});
});

// The :status token will be colored:
// red for server error codes
// yellow for client error codes
// cyan for redirection codes
// uncolored for all other codes
app.use(morgan('dev'));

// only parse urlencoded bodies
// only look at requests where the Content-Type header matches the type option
// choose to parse the URL-encoded data with the querystring library when extended: false
app.use(bodyParser.urlencoded({ extended: false }));

//parses json and only look at requests where the Content-Type header matches the type option
app.use(bodyParser.json());

// Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// secret is used to sign the session ID cookie
// resave: Forces the session to be saved back to the session store, even if the session was never modified during the request.
// saveUninitialized: Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified
app.use(session({
	secret: "8fc4c58e0fb0eb14c214b7a5df45dc94474677a555de632252113fad5225ade4", // TODO: encrypt and store secret securely
	resave: false,
	saveUninitialized: true
}));

//info routes (for posting/getting data from db)
app.use("/info/posts/users", userRoutes);
app.use("/info/posts/notes", noteRoutes);


// handle not found errors
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// handle internal server errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
