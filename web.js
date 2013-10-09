var express = require("express")
	, util = require('util')
	, config = require('./config');
var app = express();
app.use(express.logger());
app.use(express.bodyParser());


// heartbeat
app.get('/', function(request, response) {response.send('Hello World!');});


app.post('/', function(request, response) {
	if (!request || !request.body || !request.body.payload) {
		console.log("No payload specified.");
		return;
	}

	var payload = JSON.parse(request.body.payload);
	console.log(util.inspect(payload));

	// only care about commits to the master branch
	var branch = payload.ref.split("/").slice(-1)[0];
	if (branch != "master")
		return;

	console.log("from branch: " + branch);
	console.log(config.repository);

	// for (var commitCount=0; commitCount < payload.commits.length; commitCount++) {
	// 	if (payload.commits.added) {
	// 		for (var addedCount=0; addedCount < payload.commits.added.length; addedCount++) {
	// 			var rawFileUrl = masterBranchBaseUrl + payload.commits.added[addedCount];
	// 			console.log("Added url: " + rawFileUrl);
	// 		}
	// 	}

	// 	if (payload.commits.modified) {
	// 		for (var modifiedCount=0; modifiedCount < payload.commits.modified.length; modifiedCount++) {
	// 			var rawFileUrl = masterBranchBaseUrl + payload.commits.modified[modifiedCount];
	// 			console.log("Modified url: " + rawFileUrl);
	// 		}
	// 	}
	// }

});

var port = process.env.PORT || 5000;
app.listen(port, function() {console.log("Now listening on port " + port + ".");});