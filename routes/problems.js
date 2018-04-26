var express = require('express');
var router = express.Router();
var problems = require('../modles/problems');
var Users = require('../modles/users');

router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '题目 - hnistoj';
    try {
        indexContext.menuActive = 'problems';
        let pro = await problems.selectAllData('');
        var page = req.query.page;
        if (!page) page = 1;
        indexContext.page = page;
        indexContext.pages = pro.length / 50;
        indexContext.problems = pro.slice(0 + 50 * (page - 1), page * 50);
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            let user = await Users.findOne(indexContext.loginuser);
            indexContext.privilege = req.session.privilege;
            let solved = await Users.solved(req.session.loginuser);
        }

    }
    catch (e) {
        console.log(e);
    }
    res.render('problems', indexContext);
});

router.get('/:id', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = 'hnistoj';
    try {
        let id = (req.params.id);
        indexContext.menuActive = 'problems';
        let problem = await problems.findOne(id);
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (problem) {
            indexContext.title = problem[0].title;
            indexContext.problem = problem[0];
            console.log(problem[0].title);
        }
        else {

        }
        res.render('problem', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/:id/submit', async function (req, res, next) {
    console.log('submit');
    res.send('ok');
});

module.exports = router;