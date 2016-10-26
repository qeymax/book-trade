var $
var ajaxBooks = []
$(document).ready(function () {
  $('.ui.accordion').accordion()
  $('.ui.checkbox').checkbox()

  $('.closeModal').click(function () {
    $('.modal').modal('hide')
  })

  $('#addNewBook').click(function () {
    $('.addBookModal').modal('show')
    $('#addNewBookGrid').html('')
    $('#bookNameInput').val('')
  })

  $('#addNewBookForm').submit(function (event) {
    event.preventDefault()
    $('#addNewBookSegment').addClass('loading')
    if ($('#bookNameInput').val() !== '') {
      getBooks($('#bookNameInput').val())
    }
  })

  $('.bookCard').on('click',
    function () {
      $('.ui.large.modal').modal('show')
      $('.segment').addClass('loading')
      $('.bookNameSpan').text($(this).children('h5').text())
      getBookInfo($(this).attr('id'))
    })
})

var getBooks = function (bookName) {
  $
    .ajax({
      url: '/addbooks?bookname=' + bookName + '',
      type: 'GET',
      error: function (xhr, status, error) {
        console.log(error)
        $('.modal').modal('hide')
        $('#addNewBookSegment').removeClass('loading')
      },
      success: function (result, status, xhr) {
        if (typeof result !== 'object') {
          $('#addNewBookSegment').removeClass('loading')
          let html = `<h1>You need to logged in to do that.</h1>`
          $('#addNewBookGrid').html(html)
        } else {
          ajaxBooks = result.volumes
          showBooks(result.volumes)
          $('#addNewBookSegment').removeClass('loading')
        }
      }
    })
}

var showBooks = function (volumes) {
  let html = ``
  for (let volume of volumes) {
    html += `<div class="sixteen wide mobile eight wide tablet four wide computer column">
                    <div class="card choiceCard">
                    <input style="display:none" id="bookNumber" type="text" value="${volumes.indexOf(volume)}">
                      <div class="image">
                        <img class="thumbnail" src="${volume.thumbnail}"
                        alt="">
                      </div>
                      <a href="#">
                        <h5>${volume.title}</h5>
                      </a>
                    </div>
                  </div>`
  }
  $('#addNewBookGrid').html(html)
  $('.choiceCard').on('click', function () {
    $('.modal').modal('hide')
    let i = $(this).children('#bookNumber').val()
    let html = ``
    html += `<div class="sixteen wide mobile eight wide tablet four wide computer column">
                    <div id="<%= volume._id %>" class="card bookCard">
                      <div class="image">
                        <img class="thumbnail" src="${ajaxBooks[i].thumbnail}"
                        alt="">
                      </div>
                      <a href="#">
                        <h5>${ajaxBooks[i].title}</h5>
                      </a>
                    </div>
                  </div>`
    $('.booksGrid').prepend(html)
    sendBook(i)
  })
}

var sendBook = function (index) {
  $
    .ajax({
      url: '/books',
      type: 'POST',
      data: ajaxBooks[index],
      error: function (xhr, status, error) {
        console.log(error)
      },
      success: function (result, status, xhr) {

      }
    })
}

var getBookInfo = function (id) {
  $
    .ajax({
      url: '/bookinfo',
      type: 'GET',
      data: {
        id: id
      },
      error: function (xhr, status, error) {
        console.log(error)
      },
      success: function (result, status, xhr) {
        $('.segment').html(result)
        $('.segment').removeClass('loading')
      }
    })
}
