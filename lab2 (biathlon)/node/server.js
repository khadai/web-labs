var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
  bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('biathlon.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var routes = require('./routes/route');

routes(app, db);

app.listen(port);

console.log('RESTful API server started on: ' + port);
