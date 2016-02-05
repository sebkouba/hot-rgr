/**  Express Server Configuration
 * for server with webpack, dev-middleware and hot reloading
 * */

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var mongodb = require('mongodb');

/** Serves webpack files from memory -> foundation for hot reload */
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

/** actually enable the hot reloading */
app.use(require('webpack-hot-middleware')(compiler));

app.get("/data/links", (req, res) => {
  db.collection("links").find({}).toArray((err, links) => {
    if (err) throw err;

    res.json(links)
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

mongodb.MongoClient.connect(process.env.MONGO_URL, function(err, database){
  if (err) throw err;

  db = database;

  app.listen(3000, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });
});

