var express = require('express');
var router = express.Router();
var Sub = require('../modles/submissions');

router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        var pid = req.query.problem_id;
        var uid = req.query.user_id;
        var lan = req.query.language;
        var sta = req.query.status;
        indexContext.options = {
            pid:pid,
            uid:uid,
            lan:lan,
            sta:sta
        };
        let sub = await Sub.selectAllData();
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = sub.length / 50;
        indexContext.submissions = sub.slice(0+(page-1)*50,page*50);
        indexContext.menuActive = 'submissions';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('submissions', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/query', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        var pid = req.query.problem_id;
        var uid = req.query.user_id;
        var lan = req.query.language;
        var sta = req.query.status;
        indexContext.options = {
            'pid':pid,
            'uid':uid,
            'lan':lan,
            'sta':sta
        };
        console.log(indexContext.options);
        if(!pid) pid='%';
        if(!uid) uid='%';
        if(!lan) lan='%';
        if(!sta) sta='%';
        var options=[pid,uid,lan,sta];
        let sub = await Sub.selectWhere(options);
        console.log(sub);
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = sub.length / 50;
        indexContext.submissions = sub.slice(0+(page-1)*50,page*50);
        indexContext.menuActive = 'submissions';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('submissions', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;