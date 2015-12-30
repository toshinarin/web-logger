
/**
 * Module dependencies.
 */

var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');

// all environments
app.use(bodyParser.json())
app.use(bodyParser.text())
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/log', function (req, res) {
  db.serialize(function() {
    db.all('SELECT tag, log, created_at FROM logs ORDER BY created_at DESC', function(err, rows) {
      res.render('index', { title: 'Logs', rows: rows, tag: true});
    });
  });
});

app.get('/log/:tag', function (req, res) {
  db.serialize(function() {
    db.all('SELECT tag, log, created_at FROM logs WHERE tag = ? ORDER BY created_at DESC', req.params.tag, function(err, rows) {
      res.render('index', { title: 'Logs', rows: rows, tag: false});
    });
  });
});

// Content-type: application/json
app.post('/log', function (req, res) {
  data = req.body;
  db.serialize(function() {
    db.run("INSERT INTO logs (tag, log, created_at) VALUES (?, ?, ?)", data.tag, data.log, (new Date().getTime()));
    db.all("SELECT id FROM logs", function(err, rows){
      if (!err) {
        res.send("success");
      } else {
        res.send("failed. error: " + err);
      }
    });
  });
});

// Content-type: text/plain
app.post('/log/:tag', function (req, res) {
  db.serialize(function() {
    db.run("INSERT INTO logs (tag, log, created_at) VALUES (?, ?, ?)", req.params.tag, req.body, (new Date().getTime()));
    db.all("SELECT id FROM logs", function(err, rows){
      if (!err) {
        res.send("success");
      } else {
        res.send("failed. error: " + err);
      }
    });
  });
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('web-logger listening at http://%s:%s', host, port);
});
