var express = require('express')
var app = express()
var request = require('request')
var path = require('path')
var config = require('./config')
var mongoose = require('mongoose')

mongoose.connect(config.DBUrl, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to database')
  }
})



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.post('/', function (req, res) {
  let bookName = 'alchemist'
  let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=5&key=AIzaSyBhCDWa_59Ncnq-HbtSNstn68RKkOSPXQY`
  request(url, function (err, response, body) {
    if (err) {
      console.log(err)
    }
    let obj = JSON.parse(body)
    console.log(obj.items[0].volumeInfo.title)
    res.send(body)
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('server started')
})
