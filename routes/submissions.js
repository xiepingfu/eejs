var express = require('express');
var router = express.Router();
var Sub = require('../modles/submissions');

router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '评测 - hnistoj';
    try {
        var pid = req.query.problem_id;
        var uid = req.query.user_id;
        var lan = req.query.language;
        var sta = req.query.status;
        var cid = req.query.contest_id;
        var page = req.query.page;
        var pages = 0;
        if (!page) page = 1;
        indexContext.query = {
            pid: pid,
            uid: uid,
            lan: lan,
            sta: sta,
            cid: cid,
            page: page,
            pages: pages
        };
        let count = await Sub.selectAllCount(indexContext.query);
        pages = Math.ceil(count / 30);
        indexContext.query.pages = pages;
        console.log(indexContext.query.cid);
        indexContext.submissions = await Sub.selectAllData(indexContext.query);
        indexContext.menuActive = 'submissions';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('submissions', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/:id', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        let id = (req.params.id);
        console.log(id);
        indexContext.menuActive = 'submissions';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        let source = await Sub.selectSource(id);
        console.log(source);
        let submissions = await Sub.findOne(id);
        console.log(submissions);
        indexContext.source = source;
        indexContext.submissions = submissions;
        res.render('submission', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;