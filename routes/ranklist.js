var express = require('express');
var router = express.Router();
var userOld = require('../modles/usersOld');
var User = require('../modles/users');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '排名 - hnistoj';
    try {
        var page = req.query.page;
        if(!page) page=1;
        indexContext.page=page;
        indexContext.menuActive = 'ranklist';
        var ranklist =  await userOld.selectAllData();
        console.log(ranklist.length/50);
        indexContext.pages=ranklist.length/50;
        indexContext.ranklist=ranklist.slice(0+(page-1)*50,page*50);
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('ranklist', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/query', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '排名 - hnistoj';
    try {
        var uid = req.query.uid;
        var page = req.query.page;
        if(!page) page=1;
        indexContext.page=page;
        indexContext.menuActive = 'ranklist';
        var ranklist =  await userOld.selectLike(uid);
        let user = await User.findOne(uid);
        console.log(ranklist.length/50);
        indexContext.pages=ranklist.length/50;
        indexContext.ranklist=ranklist.slice(0+(page-1)*50,page*50);
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('ranklist', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;
