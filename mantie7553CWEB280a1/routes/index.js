var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('job-application', { title: 'Express' });
});

module.exports = router;
