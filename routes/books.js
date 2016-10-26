var router = require('express').Router()
var request = require('request')
var middleware = require('../middleware')
var Book = require('../models/book')
  // var path = require('path')
  // var passport = require('passport')

router.route('/books')
  .get(function (req, res) {
    Book.find({})
      .limit(10).sort({
        title: -1
      })
      .exec(function (err, books) {
        if (err) {
          console.log(err)
        } else {
          res.render('books', {
            volumes: books
          })
        }
      })
  })
  .post(middleware.isLoggedIn,
    function (req, res) {
      let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        thumbnail: req.body.thumbnail,
        language: req.body.language,
        publishedDate: req.body.publishedDate,
        averageRating: req.body.averageRating,
        description: req.body.description,
        user: req.user
      })
      newBook.save(function (err, book) {
        if (err) {
          console.log(err)
        } else {
          console.log('new book saved to database : ', book.title)
        }
      })
      console.log(req.body.title)
      res.end()
    })

router.route('/addbooks')
  .get(middleware.isLoggedIn,
    function (req, res) {
      let bookName = req.query.bookname
      if (bookName) {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=3&key=AIzaSyBhCDWa_59Ncnq-HbtSNstn68RKkOSPXQY`
        request(url, function (err, response, body) {
          if (err) {
            console.log(err)
          }
          let obj = JSON.parse(body)
          var volumes = []
          for (let item of obj.items) {
            let volumeInfo = item.volumeInfo
            var thumbnail = '/img/default-cover.jpg'
            if (volumeInfo.imageLinks) {
              thumbnail = volumeInfo.imageLinks.thumbnail.split('&')
              thumbnail[3] = 'zoom=2'
              thumbnail = thumbnail.join('&')
            }
            let subtitle = volumeInfo.subtitle ? ' - ' + volumeInfo.subtitle : ''
            let description = volumeInfo.description ? volumeInfo.description.substring(0, 100) + '....' : ''
            let volume = {
              title: volumeInfo.title.split('-')[0] + subtitle,
              author: volumeInfo.authors,
              genre: volumeInfo.categories,
              thumbnail: thumbnail,
              language: volumeInfo.language,
              publishedDate: volumeInfo.publishedDate,
              averageRating: volumeInfo.averageRating,
              description: description
            }
            volumes.push(volume)
          }

          res.json({
            volumes: volumes
          })
        })
      } else {
        res.end()
      }
    })

router.route('/bookinfo')
  .get(function (req, res) {
    if (req.query.id !== null) {
      Book.findById(req.query.id).populate('user').exec(function (err, book) {
        if (err) {
          console.log(err)
        } else {
          if (book) {
            res.render('partials/modal', {
              volume: book
            })
          } else {
            res.send('<h1> Something went wrong, please try again or contact someone... not me anyone else.</h1>')
          }
        }
      })
    }
  })

module.exports = router
