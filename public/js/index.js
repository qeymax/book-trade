var $
var ajaxBooks = []
$(document).ready(function () {
  $('.ui.accordion').accordion()
  $('.ui.checkbox').checkbox()
  $('.ui.large.modal').modal('show')
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
    $
      .ajax({
        url: '/books?bookname=' + $('#bookNameInput').val() + '',
        type: 'POST',
        error: function (xhr, status, error) {
          console.log(error)
        },
        success: function (result, status, xhr) {
          console.log(result)
          ajaxBooks = result.volumes
          let html = ``
          for (let volume of result.volumes) {
            html += `<div class="sixteen wide mobile eight wide tablet four wide computer column">
                    <div class="card choiceCard">
                    <input style="display:none" id="bookNumber" type="text" value="${result.volumes.indexOf(volume)}">
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
            console.log(i)
            let html = ``
            html += `<div class="sixteen wide mobile eight wide tablet four wide computer column">
                    <div class="card">
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
          })
          $('#addNewBookSegment').removeClass('loading')
        }
      })
  })
})
