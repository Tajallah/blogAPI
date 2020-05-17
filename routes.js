'use strict'
const Post = require('./Data Layer/models/Post')
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const db = require('./Data Layer/databaseInteractions')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.send({
      title:"WELCOME"
    })
  })

  app.get('/article', (req, res) => {
    db.findById({req.body.id}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/article/search', (req, res) => {
    db.find({description:req.body.query}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/article/search', (req, res) => {
    db.find({category:req.body.query}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/test', (req, res) => {
    db.findOne({}, '', function (err, data) {
      if (err) return handleError(err)
      res.send(data)
    });
  })

  app.get('/configured', configured(opts))

  router.post('/newArticle', (req, res) =>{
  console.log("starting post")
  console.log(req)
  console.log("req :: ", req.body)
  const post = new Post({
    title: req.body.title,
    category:req.body.category,
    description:req.body.description,
    body:req.body.body,
    hidden:req.body.hidden
  })
  console.log("saving")
  post.save()
  .then(data => {
    res.json(data)
    console.log("saved")
  })
  .catch(err => {
    res.json({message: err})
  })
})
}
