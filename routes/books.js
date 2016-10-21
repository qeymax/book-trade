var router = require('express').Router()
  // var request = require('request')
  // var path = require('path')
  // var passport = require('passport')

router.route('/books')
  .get(function (req, res) {
    res.render('books')
  })

module.exports = router
