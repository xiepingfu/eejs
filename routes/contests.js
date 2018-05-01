var express = require('express');
var router = express.Router();
var Contests = require('../modles/contest');
var Problems = require('../modles/problems');

var indexContext = {
    title: '比赛 - HNISTOJ',
    page: 1,
    pages: 1,
    contests: null,
    loginuser: '',
    privilege: 0,
};


router.get('/', async function (req, res, next) {
    try {
        let count = await Contests.Count();
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = Math.ceil(count / 15);
        indexContext.menuActive = 'contests';
        indexContext.contests = await Contests.Contests(15 * (page - 1));
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        console.log(indexContext.contests);
        res.render('contests', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let id = (req.params.id);
        let contests = await Contests.selectWhere(id);
        let problems = await Contests.Cproblems([id, id, id]);
        let start_time = new Date(contests[0].start_time).getTime();
        let end_time = new Date(contests[0].end_time).getTime();
        let cur_time = Date.now();
        indexContext.menuActive = 'contest';
        indexContext.start_time = start_time;
        indexContext.end_time = end_time;
        indexContext.cur_time = cur_time;
        indexContext.contest = contests[0];
        indexContext.problems = problems;
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('contest', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

function RANKER() {
    let ranker = new Object;
    ranker.user_id = "";
    ranker.nick = "";
    ranker.solved = 0;
    ranker.total_fraction = 0;
    ranker.total_time = 0;
    ranker.cost_time = new Array;
    ranker.fraction = new Array;
    ranker.times = new Array;
    return ranker;
}

async function ACMRANK(cid, start_time) {
    let Submissions = require('../modles/submissions');
    let contest_sub = await Submissions.contestRanklist(cid);
    let cur_user = "";
    let rankArray = new Array;
    let index = -1;
    contest_sub.forEach(function (item) {
        if (cur_user != item.user_id) {
            index = index + 1;
            rankArray[index] = RANKER();
            cur_user = item.user_id;
            rankArray[index].user_id = item.user_id;
            rankArray[index].nick = item.nick;
        }
        if (!rankArray[index].times[item.num])
            rankArray[index].times[item.num] = 0;
        if (!rankArray[index].fraction[item.num])
            rankArray[index].fraction[item.num] = 0;
        if (rankArray[index].fraction[item.num] < 99) {
            if ((100 * item.pass_rate) >= 99) {
                rankArray[index].fraction[item.num] = 100;
                if (cur_user == '123') {
                    console.log(rankArray[index].fraction[item.num]);
                    console.log(rankArray[index].times[item.num]);
                }
                rankArray[index].cost_time[item.num] = new Date(item.in_date).getTime() - start_time + rankArray[index].times[item.num] * 1000 * 60 * 20;
                rankArray[index].solved++;
                rankArray[index].total_time = rankArray[index].total_time + rankArray[index].cost_time[item.num];
            } else {
                if (rankArray[index].fraction[item.num] > rankArray[index].fraction[item.num]) {
                    rankArray[index].fraction[item.num] = rankArray[index].fraction[item.num];
                }
                rankArray[index].times[item.num]++;
            }
        }
    });
    rankArray.sort(function (a, b) {
        if (a.solved != b.solved)
            return b.solved - a.solved;
        else
            return a.total_time - b.total_time;
    });
    return rankArray;
}

router.get('/:id/ranklist', async function (req, res, next) {
    try {
        let id = (req.params.id);
        let contests = await Contests.selectWhere(id);
        let problems = await Contests.Cproblems([id, id, id]);
        let start_time = new Date(contests[0].start_time).getTime();
        let end_time = new Date(contests[0].end_time).getTime();
        let cur_time = Date.now();
        indexContext.menuActive = 'contest';
        indexContext.start_time = start_time;
        indexContext.end_time = end_time;
        indexContext.cur_time = cur_time;
        console.log(indexContext.cur_time);
        indexContext.contest = contests[0];
        indexContext.problems = problems;
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }

        let rankArray = await ACMRANK(id, start_time);
        indexContext.rankArray = rankArray;
        res.render('contest_ranklist', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/:id/problem/:pid', async function (req, res, next) {
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
        indexContext.menuActive = 'contest';
        indexContext.contest = contests[0];
        indexContext.pnum = pnum;
        indexContext.start_time = start_time;
        indexContext.end_time = end_time;
        indexContext.cur_time = cur_time;
        indexContext.problem = problems[0];
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        console.log(problems);
        res.render('contest_problem', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;