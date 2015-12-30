
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
    db.all('SELECT log, created_at FROM logs WHERE tag = ? ORDER BY created_at DESC', req.params.tag, function(err, rows) {
      res.render('index', { title: 'Logs', rows: rows, tag: false});
    });
  });
});

app.post('/log', function (req, res) {
  data = req.body;
  db.serialize(function() {
    db.run("INSERT INTO logs (tag, log, created_at) VALUES (?, ?, ?)", req.body.tag, req.body.log, (new Date().getTime()));
    var logs = ["000"];
    db.all("SELECT id FROM logs", function(err, rows){
      if (!err) {
        for (var i = 0, l = rows.length; i < l; i++) {
          logs.push(rows[i]["id"]);
        }
        res.send("logs: " + logs.join("\n"));
      } else {
        res.send("failed. error: " + err);
      }
    });
  });
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
