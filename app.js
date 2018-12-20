const express = require('express');
var path = require("path")
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");

// info routes
const userRoutes = require("./routes/users");

mongoose.connect("mongodb://YouNotePublic:YouNotePublic@younote-shard-00-00-qkm9p.mongodb.net:27017,younote-shard-00-01-qkm9p.mongodb.net:27017,younote-shard-00-02-qkm9p.mongodb.net:27017/test?ssl=true&replicaSet=YouNote-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true}); //, {useMongoClient : true});

app.use(express.static(__dirname));

app.get("/", function(req, res) {
	res.sendFile("index.html", {root: path.join(__dirname, "")});
});

app.use(morgan('dev'
	//{
	//skip: function (req, res) { return res.statusCode < 400 }
	//}
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //Cross-Origin Resource Sharing (CORS)
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*"); //
// 	res.header("Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   	);
// 	if(req.method == "OPTIONS") {
// 		res.header(""Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
// 		return res.status(200).json({});
// 	}
// 	next();
// });

//info routes
app.use("/info/posts/users", userRoutes);

app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
