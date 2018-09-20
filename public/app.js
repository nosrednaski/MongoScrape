$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br>" + data[i].score + "<br>" + data[i].articleDate + "</p>");
  }
});


$(document).on("click", "p", function() {
  $("#notes").empty();
  let thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append(`<h2>Comments on ${data.title}</h2>`);
      
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append(`<button data-id= ${data._id} id='savenote'>Save Comment</button>`);
      $("#notes").append(`<button data-id=${data._id} note-id=${data.note._id} id='deletenote'>Delete Comment</button>`);
      if (data.note) {
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function() {
  let noteId = $(this).attr("note-id");
  $.ajax({
    method: "DELETE",
    url: `/notes/${noteId}`
  })
    .then(function() {
      console.log(`Note ID:${noteId} deleted!`);
      $("#notes").empty();
    });
});