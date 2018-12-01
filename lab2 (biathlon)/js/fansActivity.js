const url = "http://localhost";
const port = 8080;
var fans = getFans();

function getFans() {
  return $.ajax({
    async: false,
    method: "GET",
    url: url + ":" + port + "/fans"    
  }).responseJSON;
}

function addFans(data) {
  return $.ajax({
    async: false,
    method: "POST",
    data: data,
    url: url + ":" + port + "/fans/add"    
  }).responseJSON;
}

function fansTemplate(appeal) {
  return `
    <div  class="fans-appeal">
    <h5><cite>${appeal.text}<br><br></cite></h5>

    <h6 class="time">${timeConverter(appeal.time)}</h6>
    <h6 class="nick">${appeal.author}</h6><br><hr>
    </div>
    `
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function add() {
  addFans({text: $("#appealText").val(), author: $("#authorText").val(), time: Math.floor(Date.now() / 1000)});
  fans = getFans();
  $("#appeals").empty();
  for (var i = 0; i < fans.length; i++) {
    $("#appeals").append(fansTemplate(fans[i]));
  }
}

for (var i = 0; i < fans.length; i++) {
  $("#appeals").append(fansTemplate(fans[i]));
}