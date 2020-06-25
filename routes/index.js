var express = require('express');
var router = express.Router();
let scrapping = require('../scraping/scrapping.all');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/search', function (req, res, next) {
  scrapping.seachService(req, res)
});

module.exports = router;
