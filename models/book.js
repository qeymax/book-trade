var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
  title: String,
  author: [String],
  categories: [String],
  thumbnail: String,
  language: String,
  publishedDate: String,
  averageRating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
var bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel
