'use strict';

module.exports = function(app, db) {
  var news = require('../controllers/NewsController');
  var fans = require('../controllers/FansController');

  // Routes
  	app.get('/news', function(req, res){
		news.getNews(db, req, res);
	});

	app.get('/fans', function(req, res){
		fans.getFans(db, req, res);
	});

	app.post('/fans/add', function(req, res){
		fans.addFans(db, req, res);
	});

	app.post('/news/add', function(req, res){
		news.addNews(db, req, res);
	});
}
