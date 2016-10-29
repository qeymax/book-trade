var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var config = require('./config')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var flash = require('connect-flash')

var User = require('./models/user')
var Request = require('./models/request')
var Meta = require('./models/meta')

var indexRoutes = require('./routes/index')
var booksRoutes = require('./routes/books')
var userRoutes = require('./routes/user')
var requestsRoutes = require('./routes/requests')

mongoose.connect(config.DBUrl, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to database')
  }
})

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(require('express-session')({
  secret: config.passportSecret,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')

//  Passport config
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
  //  ---------------------

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  if (req.isAuthenticated()) {
    Request
      .count({
        $or: [{
          sender: req.user._id,
          senderSeen: false
        }, {
          reciever: req.user._id,
          recieverSeen: false
        }]
      }, function (err, count) {
        if (err) {
          console.log(err)
        } else {
          res.locals.requestsCount = count
          next()
        }
      })
  } else {
    next()
  }
})

// Creates a meta file if there is none in the db
Meta
  .find({}, function (err, metas) {
    if (err) {
      console.log(err)
    } else {
      if (!metas) {
        var meta = new Meta({
          name: 'meta',
          languages: [],
          genres: []
        })
        meta.save()
      }
    }
  })

app.use(indexRoutes)
app.use(booksRoutes)
app.use(userRoutes)
app.use(requestsRoutes)

app.listen(process.env.PORT || 3000, function () {
  console.log('server started')
})
