var express = require('express');
var router = express.Router();
var News = require('../modles/news');


/***************************************** notice */
router.get('/notice', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '管理 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        var page = req.query.page;
        if (!page) page = 1;
        var news = await News.selectAllData();
        indexContext.pages = (news.length + 9) / 10;
        indexContext.page = page;
        indexContext.news = news.slice(0 + 10 * (page - 1), page * 10);
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
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
    indexContext.title = '管理 - hnistoj';
    try {
        let nid = await req.params.id;
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        var news = await News.selectWhere(nid);
        indexContext.news = news[0];
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
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
    indexContext.title = '管理 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
            res.redirect('/index');
        }
        res.render('admin_noticeAdd', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

/***************************************** problem */
router.get('/problem', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '管理 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
            res.redirect('/index');
        }
        let problems = require('../modles/problems');
        let count = await problems.selectCount();
        count = count[0].count;
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = (count + 99) / 50;
        indexContext.problems = await problems.selectAllData([1000 + (page - 1) * 50, 1000 + page * 50]);
        res.render('admin_problemsList', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/problem/edit', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '管理 - hnistoj';
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
            res.redirect('/index');
        }
        let pid = req.query.pid;
        if (pid) {
            //edit
            console.log(pid);
            let problems = require('../modles/problems');
            let problem = await problems.findOne(pid);
            indexContext.problem = problem[0];
            indexContext.mode = 'edit';
        } else {
            //add
            indexContext.mode = 'add';
            indexContext.problem = {
                time_limit:"1",
                memory_limit:"256",
                defunct:"N"
            };
        }
        res.render('admin_problemEdit', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});
/***************************************** contest */
router.get('/contest', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '管理 - hnistoj';
    console.log('?');
    try {
        indexContext.menuActive = 'admin';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.privilege == 0) {
            res.redirect('/index');
        }
        var Contests = require('../modles/contest');
        let contests = await Contests.selectAllData('');
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = (contests.length+9) / 10;
        indexContext.contests = contests.slice(0 + 10 * (page - 1), page * 10);
        res.render('admin_contestList', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;