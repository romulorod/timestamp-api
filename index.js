// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
	if (!req.params.date)
		res.json({ utc: new Date(), unix: new Date().getTime() });
	const utc = req.params?.date?.includes("-") || req.params?.date?.includes(",");
	const date = utc ? new Date(req.params.date) : new Date(+req.params.date);
	//console.log(new Date("Fri, 25 Dec 2015 00:00:00 GMT"));
	//console.log(req.params.date);
	//console.log(new Date(req.params.date));
	console.log(date);
	if (date == "Invalid Date") return res.json({ error: "Invalid Date" });
	res.json({ utc: date.toGMTString(), unix: date.getTime() });
});

// listen for requests :)
var listener = app.listen("3000", function () {
	console.log("Your app is listening on port " + listener.address().port);
});
