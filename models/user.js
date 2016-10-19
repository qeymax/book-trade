var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userModel = mongoose.model('User', new Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  Country: String,
  sentRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }],
  recievedRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }],
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
}))

module.exports = userModel
