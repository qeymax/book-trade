var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var config = require('./config')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')

var User = require('./models/user')

var indexRoutes = require('./routes/index')

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
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')

//  Passport config
app.use(require('express-session')({
  secret: config.passportSecret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
  //  ---------------------

app.use(indexRoutes)

app.listen(process.env.PORT || 3000, function () {
  console.log('server started')
})
