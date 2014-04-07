var path = require('path');
var logfmt = require('logfmt');
var twilio = require('twilio');
var express = require('express');

var app = express();
var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Express Middleware
app.use(logfmt.requestLogger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// Enable long-polling of text responses.
// Quick and fast solution, not meant to scale.
connections = [];
app.get('/getResponses', function(req, res) {
  connections.push(res);
});

// Send messages to Twilio
app.post('/sendText', function(req, res) {
  client.sendMessage({
    to: req.body.to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: req.body.body,
  }, function(err, result) {
    if (err) {
      console.log('Error sending!');
      console.log(err);
      res.send(500);
    }
    res.send(200);
  });
});

// Receive messages from Twilio
app.post('/receiveText', function(req, res) {
  connections.forEach(function(c) {
    c.send(req.body);
  });

  var twiml = new twilio.TwimlResponse();
  res.send(twiml.toString());
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});