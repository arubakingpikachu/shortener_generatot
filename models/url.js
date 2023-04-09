const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema=new Schema({
  originalUrl:{
    type: String, 
    required: true 
  },
  shortenerUri:{
    type: String
  }
})

module.exports = mongoose.model('urlData', urlSchema)