var User = require('../models/user')

var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

middlewareObj.checkRegister = function (req, res, next) {
  var password = req.body.password
  var repeatPassword = req.body.repeatpassword
  var email = req.body.email
  var country = req.body.country
  var fullname = req.body.fullname
  var terms = req.body.terms

  if (emailExisted(email)) {
    req.flash('error', 'Email Already Existed')
  } else if (checkEmpty(password)) {
    req.flash('error', 'Password is required')
  } else if (checkEmpty(email)) {
    req.flash('error', 'Email is required')
  } else if (!passwordMatch(password, repeatPassword)) {
    req.flash('error', 'Password does not match')
  } else if (checkEmpty(fullname)) {
    req.flash('error', 'Full Name is required')
  } else if (checkEmpty(country)) {
    req.flash('error', 'Country is required')
  } else if (!terms) {
    req.flash('error', 'YOU HAVE TO AGREE!!!')
  } else {
    req.flash('success', 'Registration Completed Successfully')
    return next()
  }
  res.redirect('/register')
}

middlewareObj.checkProfile = function (req, res, next) {
  var newPassword = req.body.newpassword
  var repeatPassword = req.body.repeatpassword
  var email = req.body.email
  var country = req.body.country
  var fullname = req.body.fullname

  if (emailExistedProfile(req.user.email, email)) {
    req.flash('error', 'Email Already Existed')
  } else if (checkEmpty(email)) {
    req.flash('error', 'Email is required')
  } else if (!passwordMatch(newPassword, repeatPassword)) {
    req.flash('error', 'Password does not match')
  } else if (checkEmpty(fullname)) {
    req.flash('error', 'Full Name is required')
  } else if (checkEmpty(country)) {
    req.flash('error', 'Country is required')
  } else {
    return next()
  }
  res.redirect('/user/edit')
}

var emailExisted = function (email) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      return true
    } else {
      return false
    }
  })
}

var emailExistedProfile = function (oldemail, email) {
  if (oldemail === email) {
    return false
  } else {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        console.log(err)
      }
      if (user) {
        return true
      } else {
        return false
      }
    })
  }
}

var checkEmpty = function (field) {
  if (field === '') {
    return true
  }
  return false
}

var passwordMatch = function (password, repeatPassword) {
  if (password === repeatPassword) {
    return true
  }
  return false
}

module.exports = middlewareObj
