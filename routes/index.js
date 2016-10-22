var router = require('express').Router()
  // var request = require('request')
  // var path = require('path')
var passport = require('passport')
var User = require('../models/user')
var middleware = require('../middleware')

router.route('/')
  .get(function (req, res) {
    res.render('index')
  })

router.route('/login')
  .get(function (req, res) {
    if (req.user) {
      res.redirect('/')
    } else {
      res.render('login')
    }
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: 'Invalid password/username.',
    failureRedirect: '/login'
  }), function (req, res) {

  })

router.route('/register')
  .get(function (req, res) {
    if (req.user) {
      res.redirect('/')
    } else {
      res.render('register')
    }
  })
  .post(middleware.checkRegister, function (req, res) {
    User.register(new User({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      country: req.body.country
    }), req.body.password, function (err, user) {
      if (err) {
        req.flash('error', err)
        console.log(err)
        return res.redirect('/register')
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/')
      })
    })
  })

router.route('/logout')
  .get(function (req, res) {
    req.logout()
    res.redirect('/')
  })

module.exports = router
