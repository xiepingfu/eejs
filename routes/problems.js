var express = require('express');
var router = express.Router();
var problems = require('../modles/problems');
var Users = require('../modles/users');

var indexContext = {
    title: '题目 - HNITOJ',
    menuActive: 'problems',
    page: 1,
    pages: 1,
    problems: null,
    loginuser: '',
    privilege: 0,
    msg: null
}


router.get('/', async function (req, res, next) {
    var page = req.query.page;
    if (!page) page = 1;
    indexContext.page = page;
    let count = await problems.Count();
    indexContext.pages = Math.ceil(count / 50);
    indexContext.problems = await problems.Problems([(page - 1) * 50]);
    indexContext.loginuser = '';
    indexContext.privilege = 0;
    if (req.session.loginuser) {
        indexContext.loginuser = req.session.loginuser;
        indexContext.privilege = req.session.privilege;
    }
    res.render('problems', indexContext);
});

router.get('/:id', async function (req, res, next) {
    let id = (req.params.id);
    let problem = await problems.findOne(id);
    indexContext.loginuser = '';
    indexContext.privilege = 0;
    if (req.session.loginuser) {
        indexContext.loginuser = req.session.loginuser;
        indexContext.privilege = req.session.privilege;
    }
    if (problem) {
        indexContext.title = problem[0].title;
        indexContext.problem = problem[0];
        console.log(problem[0].title);
    }
    res.render('problem', indexContext);
});

router.get('/:id/statistics', async function (req, res, next) {
    let id = (req.params.id);
    let problem = await problems.findOne(id);
    indexContext.loginuser = '';
    indexContext.privilege = 0;
    if (req.session.loginuser) {
        indexContext.loginuser = req.session.loginuser;
        indexContext.privilege = req.session.privilege;
    }
    if (problem) {
        indexContext.title = problem[0].title;
        indexContext.problem = problem[0];
        console.log(problem[0].title);
    }
    res.render('problem_statistics', indexContext);
});

module.exports = router;