var router = require('express').Router()
var request = require('request')
  // var path = require('path')
  // var passport = require('passport')

router.route('/books')
  .get(function (req, res) {
    res.render('books')
  })
  .post(function (req, res) {
    let bookName = req.query.bookname
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
        let subtitle = volumeInfo.subtitle ? ' - ' + volumeInfo.subtitle.substring(0, 20) : ''
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
  })

module.exports = router
