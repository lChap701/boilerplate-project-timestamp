// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Displays timestamps
app.get("/api/:date", function(req, res, next) {
  // Retrieves date from endpoint
  let { date } = req.params;  

  // Checks if date is in UNIX
  if (Number.isNaN(Date.parse(date))) {
    // Saves UNIX
    req.unix = date;

    // Converts UNIX to UTC
    req.utc = new Date(+date).toUTCString()
  } else {
    // Converts date to UNIX
    req.unix = new Date(date).getTime();

    // Converts date to UTC
    req.utc = new Date(date).toUTCString();
  }

  next();
}, function(req, res) {
  // Displays date in UNIX and UTC format as JSON
  res.json({ unix: req.unix, utc: req.utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
