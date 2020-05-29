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
    Post.findById({id:req.body.id}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/article/search/description', (req, res) => {
    let re = new RegExp(req.body.query)
    Post.find({description:re}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/article/search/category', (req, res) => {
    let re = new RegExp(req.body.query)
    Post.find({category:re}, function (err, data) {
      if (err) res.send(err)
      res.send(data)
    })
  })

  app.get('/test', (req, res) => {
    Post.findOne({}, '', function (err, data) {
      if (err) return handleError(err)
      res.send(data)
    });
  })

  app.get('/configured', configured(opts))

  app.post('/newArticle', (req, res) =>{
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
