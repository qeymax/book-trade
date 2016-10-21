var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
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
})
userSchema.plugin(passportLocalMongoose)
var userModel = mongoose.model('User', userSchema)

module.exports = userModel
