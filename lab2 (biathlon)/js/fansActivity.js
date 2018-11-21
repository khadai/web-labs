class Appeal{
  constructor(contents, datetime) {
    this.contents = contents;
    this.datetime = datetime;
  }
}

function appealTemplate (appeal) {
  var contents = appeal.contents;
  var datetime = appeal.datetime;

  return `
    <div  class="fans-appeal">
    <h5><cite>${contents}<br><br></cite></h5>

    <h6 class="time">${datetime}</h6>
    <h6 class="nick">anonim</h6><br><hr>
    </div>
    `
}

var useLocalStorage = false;

function isOnline() {
    return window.navigator.onLine;
}

function load_data() {
  if(isOnline() && useLocalStorage) {
    items = JSON.parse(localStorage.getItem("appeals"));
    if(items) {
      for(var i = 0; i < items.length; i++){
        var temp = new Appeal(items[i].contents, items[i].datetime)
        $('#appeals').append(
          appealTemplate(temp)
        );
      }
    }
  }
  if(isOnline() && !useLocalStorage) {
      var openDB = indexedDB.open("appeals-data", 1);     //
      openDB.onupgradeneeded = function() {               //upgrade
          var db = openDB.result;
          var store = db.createObjectStore("appeals", {keyPath: "contents"});
          store.createIndex("contents", "contents", { unique: false });
          store.createIndex("datetime", "datetime", { unique: false });
      }
      openDB.onsuccess = function(event) {
        var db = openDB.result;
        var tx = db.transaction("appeals", "readwrite");   //open transaction
          var store = tx.objectStore("appeals");           //table
          store.openCursor().onsuccess = function(event) { //
          var cursor = event.target.result;                //         

          if (cursor) {
            var temp = new Appeal(cursor.value.contents, cursor.value.datetime);
              $('#appeals').append(appealTemplate(temp));
              cursor.continue();
          }
        };
          tx.oncomplete = function(){
            db.close();
          }
      } 
  }
  if (!isOnline()) {
    alert("You are offline");
  }
}

appeals = []

function send() {
  var appeal =  document.getElementById('appealText');
  if(appeal.value.trim() != "") {
    var new_appeal = {};
    new_appeal.contents = appeal.value;
    var dateTime = new Date();
    new_appeal.datetime= dateTime.getDate() + '.'
    + (dateTime.getMonth()+1) + '.'
    + dateTime.getFullYear() + ' ' + dateTime.getHours()+':'
    + dateTime.getMinutes();      

    if(!isOnline() && useLocalStorage) {
      appeals.push(new_appeal)
      localStorage.setItem("appeals",JSON.stringify(appeals));
      alert('Message saved locally: "' + new_appeal.contents + '"');
    }
    if(isOnline() && useLocalStorage) {
      $('#appeals').append(
        appealTemplate(new_appeal));
        alert('Message sent to server: "' + new_appeal.contents + '"');
    }
    if(!useLocalStorage) {
      var openDB = indexedDB.open("appeals-data", 1);

      openDB.onerror = function(event) {
        alert("Error occurred when loading appeal");
      };

      openDB.onsuccess = function(event) {
        var db = openDB.result;
        var tx = db.transaction(["appeals"], "readwrite");
        var store = tx.objectStore("appeals");
        var temp = new Appeal(new_appeal.contents, new_appeal.datetime);
        console.log(temp);
        var addAppeal = store.put(temp);
        addAppeal.onsuccess = function(event){
          alert("Appeal created");
        }
        addAppeal.onerror = function(event){
          alert("Error occurred when loading appeals");
        }
        tx.oncomplete = function(){
          db.close();
        }
      };
    }
  }
  else {
    alert("Appeal must be filled out");
    return;
  }
  clearUI();
}


function clearUI () {
    document.getElementById('appealText').value = '';
}

function sendAllToServer() {
  items = JSON.parse(localStorage.getItem("appeals"));
    for(var i = 0; i < items.length; i++){
       alert("Sending to server item " + items[i].contents);
    }
    localStorage.removeItem("appeals");
}

 (function () {
    if (window.applicationCache) {
        window.addEventListener('online', function (e) {
          alert('Back online');
          load_data();
        }, true);

        window.addEventListener('offline', function (e) {
          alert('Gone offline');
        }, true);
    }
})();

