// const review_template = (title, text, datetime) => `
//     <div class="post-preview">
//       <h2 class="post-title">${title}</h2>
//       <p class="post-subtitle">${text}</p>
//       <div class="row">
//         <div class="col-auto">
//           <p class="post-meta">Posted on ${datetime}</p>
//         </div>
//         <div class="col-auto">
//           <p class="author"> <a href="#" style="float: right;">by anonymous</a></p>
//         </div>
//       </div>
//     </div>
//     `

// function isOnline() {
//     return window.navigator.onLine;
// }

// function load_data() {
//   if(isOnline()) {
//     items = JSON.parse(localStorage.getItem("appeals"));
//     for(var i = 0; i < items.length; i++){
//       $('#appeals').append(
//           review_template(items[i].title, items[i].review, items[i].datetime)
//         );
//     }
//     } 
// }

// reviews = []

// function send() {
//   var review =  document.getElementById('appealText');
//   if(review.value.trim() != "") {
//     var new_review = {};
//     new_review.title = review.value.split("\n",1)[0];
//     new_review.review = review.value;
//     var date = new Date();
//     new_review.datetime = date.getDate() + "."
//                 + (date.getMonth()+1)  + "." 
//                 + date.getFullYear() + "\t"  
//                 + date.getHours() + ":"  
//                 + date.getMinutes();
//     if(!isOnline()) {
//       reviews.push(new_review)
//       localStorage.setItem("appeals",JSON.stringify(reviews));
//       alert('Message saved locally: "' + new_review.title + '"');
//     }
//     if(isOnline()) {
//       $('#posts').append(
//         review_template(new_review.title, new_review.review, new_review.datetime));
//         alert('Message sent to server: "' + new_review.title + '"');
//     }
//   }
//   else {
//     alert("Review must be filled out");
//     return;
//   }
//   clearUI();
// };


// function clearUI () {
//     document.getElementById('appealText').value = '';
// }

// function sendAllToServer() {
//   items = JSON.parse(localStorage.getItem("appeals"));
//     for(var i = 0; i < items.length; i++){
//        alert("Sending to server item " + items[i].title);
//     }
//     localStorage.removeItem("appeals");
// }

 (function () {
    if (window.applicationCache) {
        window.addEventListener('online', function (e) {
          alert('Back online');
        }, true);

        window.addEventListener('offline', function (e) {
          alert('Gone offline');
        }, true);
    }
})();