exports.getNews = function(db, request, response) {

	let sql = `SELECT * FROM news`;

	db.all(sql, [], (err, news) => {
	  if (err) {
	    throw err;
	  }
	  response.json(news);
	});

};

exports.addNews = function(db, request, response) {

	let sql = `INSERT INTO news (title, text, image) VALUES ('${request.body.title}', '${request.body.text}', '${request.body.image}')`;

	db.all(sql, [], (err, res) => {
	  if (err) {
	    throw err;
	  }
	  response.json(res);
	});

};