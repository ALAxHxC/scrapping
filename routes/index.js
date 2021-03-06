var express = require('express');
var router = express.Router();
let scrapping = require('../scraping/scrapping.all');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.post('/search', function (req, res, next) {
  scrapping.seachService(req, res)
});
router.post('/rest', function (req, res, next) {
  scrapping.seachServiceApi(req, res)
});

module.exports = router;
