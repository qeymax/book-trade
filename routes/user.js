var router = require('express').Router()
  // var request = require('request')
  // var path = require('path')
  // var passport = require('passport')

router.route('/user/edit')
  .get(function (req, res) {
    res.render('profile')
  })

router.route('/user/:id/books')
  .get(function (req, res) {
    res.render('user-books')
  })

module.exports = router
