var express = require('express');
var router = express.Router();
var userOld = require('../modles/usersOld');
var news = require('../modles/news');
var contests = require('../modles/contest');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        indexContext.ranklist =  await userOld.indexRankList();
        indexContext.news = await news.selectAllData();
        indexContext.contests = await contests.selectAllData('LIMIT 5');
        indexContext.menuActive = 'index';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('index', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;
