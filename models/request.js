var mongoose = require('mongoose')
var Schema = mongoose.Schema

var requestSchema = new Schema({
  status: String,
  sender: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  reciever: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sernderBook: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  recieverBook: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
})
var requestModel = mongoose.model('Request', requestSchema)

module.exports = requestModel
