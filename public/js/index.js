var $
$(document).ready(function () {
  $('.ui.accordion').accordion()
  $('.ui.checkbox').checkbox()
  $('.ui.large.modal').modal('show')


  $('#addNewBookLink').click(function () {
    $('#addNewBook').animate({
      width: '400px'
    }, 500, function () {
      $('#addNewBook .bookName').css('display', 'inline')
    })
  })
  $('#addNewBook .bookName .input .icon').click(function () {
    $('#addNewBook').animate({
      width: '160px'
    }, 500, function () {
      $('#addNewBook .bookName').css('display', 'none')
    })
  })
  $('#addNewBook').submit(function (event) {
    event.preventDefault()
    $('#addNewBook .bookName').addClass('loading')
    var html = `<div class="sixteen wide mobile eight wide tablet four wide computer column">
                  <div class="card">
                    <div class="image">
                      <img class="thumbnail" src="http://books.google.com/books/content?id=FEL8DlqjYEkC&printsec=frontcover&img=1&zoom=2&source=gbs_api"
                      alt="">
                    </div>
                    <a href="#">
                      <h5>The aaa</h5>
                    </a>
                    <div class="ui Alcemist"></div>
                      <p>Fiction, Fiction, Genre</p>
                  </div>
                </div>`
    $('.booksGrid').prepend(html)
    $('#addNewBook .bookName').removeClass('loading')
  })
})
