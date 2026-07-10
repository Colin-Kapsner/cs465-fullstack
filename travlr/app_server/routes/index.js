var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */

router.get('/', ctrlMain.index);

/*
This was the original router.get call
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
module.exports = router;
