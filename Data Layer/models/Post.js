const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  body:{
    type:String,
    required:true
  },
  hidden:{
    type:Boolean,
    required:true,
    default:true
  }
})

module.exports = mongoose.model('Posts', PostSchema)
