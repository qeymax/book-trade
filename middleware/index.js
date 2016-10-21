var middlewareObj = {}

// middlewareObj.checkCampOwnership = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         Camp.findById(req.params.id, function (err, camp) {
//             if (err) {
//                 req.flash("error", "Camp not found!");
//                 res.redirect("back");
//             } else {
//                 if (camp.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "You don't have permession to do that.");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that.");
//         res.redirect("back");
//     }
// }

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

middlewareObj.checkRegister = function (req, res, next) {
  let password = req.body.password
  let repeatPassword = req.body.repeatpassword
  let email = req.body.email
  let country = req.body.country
  let fullname = req.body.fullname

  if (emailExisted(email)) {
    req.flash('error', 'Email Already Existed')
  } else if (checkEmpty(email)) {
    req.flash('error', 'Email is required')
  } else if (!passwordMatch(password, repeatPassword)) {
    req.flash('error', 'Password does not match')
  } else if (checkEmpty(fullname)) {
    req.flash('error', 'Full Name is required')
  } else if (checkEmpty(country)) {
    req.flash('error', 'Country is required')
  } else {
    req.flash('success', 'Registration Completed Successfully')
    return next()
  }
  res.redirect('/register')
}

var emailExisted = function (email) {
  return false
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
