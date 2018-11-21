function isOnline() {
    return window.navigator.onLine;
}

var useLocalStorage = false;

class News {
  constructor(title, long_descr, img) {
    this.title =  title;
    this.long_descr = long_descr;
    this.img = img;
  }
}

function newsTemplate(news){
	var title =  news.title;
    var long_descr = news.long_descr;
    var photo = news.img;
 return `
<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
	<div > 
		<img class="img-thumbnail" src=${photo}>
		<table>
			<tr>
				<th>
					<h3>${title}</h3>
				</th>
			</tr>
			<tr>
				<td>
					<p>${long_descr}</p>
				</td>
			</tr>
		</table>
	</div>
</div>
 `
}

 function addElementNews(){
	if(isOnline() && useLocalStorage){
	items = localStorage.getItem("news_list");
	if(items) {
	    for(var i = 0; i < items.length; i++){
	    	var temp = new News(items[i].title, items[i].short_descr,
			    	items[i].long_descr, items[i].img)
	 		$('#news').prepend(
			    newsTemplate(temp)
			  	);
			}
		}
	}
	else if(isOnline() && !useLocalStorage){
		var openDB = indexedDB.open("news_list", 1);
	    openDB.onupgradeneeded = function() {
	        var db = openDB.result;
	        var store = db.createObjectStore("news", {keyPath: "title"});
	        store.createIndex("title", "title", { unique: false });
	        store.createIndex("long_descr", "long_descr", { unique: false });
	        store.createIndex("img", "img", { unique: false });
	    }
	    openDB.onsuccess = function(event) {
	      var db = openDB.result;
	      var tx = db.transaction("news", "readwrite");
	        var store = tx.objectStore("news");
	        store.openCursor().onsuccess = function(event) {
	        var cursor = event.target.result;

	        if (cursor) {
	          var temp = new News(cursor.value.title,  cursor.value.long_descr, cursor.value.img);
	          $('#news').prepend(
			    newsTemplate(temp)
			  );
	          cursor.continue();
	        }
	      };
	        tx.oncomplete = function(){
	          db.close();
	        }
	    }
	}
	else {
		alert("You are offline");
	}
}	


(function () {
    if (window.applicationCache) {
        window.addEventListener('online', function (e) {
          alert('Back online');
          addElementNews();
      }, true);

        window.addEventListener('offline', function (e) {
          alert('Gone offline');
      }, true);
    }
})();