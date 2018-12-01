const url = "http://localhost";
const port = 8080;

function addNews(data) {
  return $.ajax({
    async: false,
    method: "POST",
    data: data,
    url: url + ":" + port + "/news/add"    
  }).responseJSON;
}

function add() {
  addNews({title: $("#newsTitle").val(), text: $("#newsText").val(), image: "images/" + $("#fileform").val().split('\\').pop()});
  window.location.href = "news.html";
}