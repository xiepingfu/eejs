var express = require('express');
var router = express.Router();
var Contests = require('../modles/contest');
var Problems = require('../modles/problems');

router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '比赛 - hnistoj';
    try {
        let contests = await Contests.selectAllData('');
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = (contests.length+9) / 10;
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
        let problems = await Contests.Cproblems([id,id,id]);
        let start_time = new Date(contests[0].start_time).getTime();
        let end_time = new Date(contests[0].end_time).getTime();
        let cur_time = Date.now();
        indexContext.start_time = start_time;
        indexContext.end_time = end_time;
        indexContext.cur_time = cur_time;
        console.log(indexContext.cur_time);
        indexContext.contest = contests[0];
        indexContext.problems = problems;
        indexContext.menuActive = 'contest';
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

router.get('/:id/problem/:pid', async function (req, res, next) {
    console.log('---------');
    var indexContext = {};
    indexContext.title = '比赛 - hnistoj';
    try {
        let id = (req.params.id);
        let pid = parseInt(req.params.pid);
        let pnum = req.query.pnum;
        let contests = await Contests.selectWhere(id);
        let problems = await Problems.findOne(pid);
        let start_time = new Date(contests[0].start_time).getTime();
        let end_time = new Date(contests[0].end_time).getTime();
        let cur_time = Date.now();
        indexContext.cid = id;
        indexContext.contest = contests[0];
        indexContext.pnum = pnum;
        indexContext.start_time = start_time;
        indexContext.end_time = end_time;
        indexContext.cur_time = cur_time;
        indexContext.problem = problems[0];
        indexContext.menuActive = 'contest';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('contest_problem', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;