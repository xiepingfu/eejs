var express = require('express');
var router = express.Router();
var mysql = require('../config/mysql');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title:'users'});
});

module.exports = router;
