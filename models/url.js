const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema=new Schema({
  originalUrl:{
    type: String, 
    required: true 
  },
  shortenerUrl:{
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('urlData', urlSchema)