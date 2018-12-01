exports.getFans = function(db, request, response) {

	let sql = `SELECT * FROM fans`;

	db.all(sql, [], (err, fans) => {
	  if (err) {
	    throw err;
	  }
	  response.json(fans);
	});

};

exports.addFans = function(db, request, response) {

	let sql = `INSERT INTO fans (text, author, time) VALUES ('${request.body.text}', '${request.body.author}', ${request.body.time})`;

	db.all(sql, [], (err, res) => {
	  if (err) {
	    throw err;
	  }
	  response.json(res);
	});

};