var router = require('express').Router()
var request = require('request')
  // var path = require('path')
var passport = require('passport')

router.route('/')
  .get(function (req, res) {
    res.render('index')
  })
  .post(function (req, res) {
    let bookName = 'alchemist'
    let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=5&key=AIzaSyBhCDWa_59Ncnq-HbtSNstn68RKkOSPXQY`
    request(url, function (err, response, body) {
      if (err) {
        console.log(err)
      }
      // let obj = JSON.parse(body)
      // console.log(obj.items[0].volumeInfo.title)
      res.send(body)
    })
  })

router.route('/login')
  .get(function (req, res) {

  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), function (req, res) {

  })

router.route('/register')
  .get(function (req, res) {

  })
  .get(function (req, res) {
    res.render('books')
  })

module.exports = router
