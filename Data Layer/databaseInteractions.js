const Post = require('./models/Post')
const mongoose = require('mongoose')
require('dotenv/config')

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database')
});

/*class dataFetcher {
  function getArticleByID() {

  }
}*

/*Post.findOne({}, '', function (err, Post) {
  if (err) return handleError(err);
  console.log('<h1>%s</h1><br><br>%s<br><br><h2>%s<h2><br><br>%s', Post.title, Post.date, Post.description, Post.body);
});*/

module.exports = db
