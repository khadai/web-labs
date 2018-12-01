const url = "http://localhost";
const port = 8080;

function getNews () {
	return $.ajax({
	  async: false,
	  method: "GET",
	  url: url + ":" + port + "/news"    
	}).responseJSON;
}

function newsTemplate(news) {
	return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
		<div > 
			<img class="img-thumbnail" src=${news.image}>
			<table>
				<tr>
					<th>
						<h3>${news.title}</h3>
					</th>
				</tr>
				<tr>
					<td>
						<p>${news.text}</p>
					</td>
				</tr>
			</table>
		</div>
		</div>`
}

var news = getNews();

for (var i = 0; i < news.length; i++) {
	$("#news").append(newsTemplate(news[i]));
}