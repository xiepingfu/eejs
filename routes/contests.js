var express = require('express');
var router = express.Router();
var Contests = require('../modles/contest');

router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '比赛 - hnistoj';
    try {
        let contests = await Contests.selectAllData('');
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = contests.length / 10;
        indexContext.contests = contests.slice(0 + 10 * (page - 1), page * 10);
        indexContext.menuActive = 'contests';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('contests', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/:id', async function (req, res, next) {
    console.log('---------');
    var indexContext = {};
    indexContext.title = '比赛 - hnistoj';
    try {
        let id = (req.params.id);
        let contests = await Contests.selectWhere(id);
        let problems = await Contests.Cproblems(id);
        indexContext.contest = contests[0];
        indexContext.problems = problems;
        indexContext.menuActive = 'contests';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        console.log('---------end');
        res.render('contest', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;