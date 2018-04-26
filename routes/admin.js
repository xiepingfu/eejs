var express = require('express');
var router = express.Router();
var News = require('../modles/news');

router.get('/notice', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        var page = req.query.page;
        if (!page) page = 1;
        var news = await News.selectAllData();
        indexContext.pages = (news.length+9) / 10;
        indexContext.page = page;
        indexContext.news = news.slice(0 + 10 * (page - 1), page * 10);
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if(indexContext.privilege==0)
        {
            res.redirect('/index');
        }
        res.render('admin_noticeList', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/noticeEdit/:id', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        let nid = await req.params.id;
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        var news = await News.selectWhere(nid);
        indexContext.news = news[0];
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if(indexContext.privilege==0)
        {
            res.redirect('/index');
        }
        res.render('admin_noticeEdit', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/noticeAdd', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if(indexContext.privilege==0)
        {
            res.redirect('/index');
        }
        res.render('admin_noticeAdd', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;