var express = require('express');
var router = express.Router();
var User = require('../modles/usersOld');
var userNew = require('../modles/users');
var Sub = require('../modles/submissions');

router.get('/:id', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '个人中心 - hnistoj';
    try {
        let uid = req.params.id;
        indexContext.user = await User.findOne(uid);
        let sub = await Sub.selectCount(uid);
        console.log(sub);
        let submissions={};
        sub.forEach(function(item){
            submissions[item.result]=item.count;
        });
        console.log(submissions);
        indexContext.submissions=submissions;
        indexContext.menuActive = '';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('user', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/:id/edit', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '个人中心 - hnistoj';
    try {
        let uid = req.params.id;
        indexContext.user = await User.findOne(uid);
        indexContext.menuActive = '';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if(indexContext.loginuser!=uid)
        {
            res.redirect('/user/'+uid);
            return;
        }
        res.render('userEdit', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;