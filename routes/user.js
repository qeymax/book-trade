var router = require('express').Router()
var User = require('../models/user')
var middleware = require('../middleware')
  // var request = require('request')
  // var path = require('path')
var passport = require('passport')

router.route('/user/edit')
  .get(middleware.isLoggedIn,
    function (req, res) {
      res.render('profile')
    })
  .post(middleware.isLoggedIn,
    middleware.checkProfile,
    passport.authenticate('local', {
      failureFlash: 'Invalid password.',
      failureRedirect: '/user/edit'
    }),
    function (req, res) {
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        email: req.body.email,
        country: req.body.country,
        fullname: req.body.fullname
      }, function (err, user) {
        if (err) {
          console.log(err)
        }
        if (req.body.newpassword !== '') {
          user.setPassword(req.body.newpassword, function () {
            user.save()
          })
        }
        req.flash('success', 'Information Changed Successfully')
        res.redirect('/user/edit')
      })
    })

router.route('/user/:id/books')
  .get(function (req, res) {
    res.render('user-books')
  })

module.exports = router
