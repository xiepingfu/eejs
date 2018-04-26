var express = require('express');
var router = express.Router();
var User = require('../modles/users');
var UsersOld = require('../modles/usersOld');

router.post('/login', async (req, res) => {
    var ec = 1001;
    try {
        let user = await User.findOne(req.body.username);
        if (user) {
            ec = 1002;
            console.log(user);
            if (user.password == req.body.password) {
                ec = 1;
                req.session.loginuser = user.user_id;
                req.session.privilege = user.privilege;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({ error_code: ec });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.get('/loginout', async (req, res) => {
    try {
        req.session.destroy();
        res.setHeader('Content-Type', 'application/json');
        res.send({ error_code: ec });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/news/delete', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let News = require('../modles/news');
        let resualt = await News.deleteWhere(req.body.news_id);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/news/top', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let News = require('../modles/news');
        let isTop= 0;
        if(req.body.checked=='false')
        {
            isTop = 1;
            console.log(req.body.checked);
        }    
        let resualt = await News.changeTop([isTop,req.body.news_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/news/public', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let News = require('../modles/news');
        let isPublic= 'Y';
        if(req.body.checked=='false')
        {
            isPublic = 'N';
        }    
        let resualt = await News.changePublic([isPublic,req.body.news_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/news/edit', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let markdown = req.body.markdown;
        let content = req.body.content;
        let news_id = req.body.news_id;
        let title = req.body.title;
        let isPublic = req.body.isPublic;
        let isTop = req.body.isTop;
        if(isPublic=='false') isPublic='Y';
        else isPublic='N';
        if(isTop=='false') isTop=0;
        else isTop=1;
        let News = require('../modles/news');
        var ti = new Date().toLocaleString();
        var resualt = await News.updateWhere([title,content,ti,isTop,isPublic,markdown,news_id]);
        res.send({ error_code: 1 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/newsAdd', async (req, res) => {
    console.log('add');
    try {
        res.setHeader('Content-Type', 'application/json');
        let markdown = req.body.markdown;
        let content = req.body.content;
        let title = req.body.title;
        let uid = req.body.uid;
        let isPublic = req.body.isPublic;
        let isTop = req.body.isTop;
        if(isPublic=='false') isPublic='Y';
        else isPublic='N';
        if(isTop=='false') isTop=0;
        else isTop=1;
        let News = require('../modles/news');
        var ti = new Date().toLocaleString();
        var resualt = await News.insertOne([uid,title,content,ti,isTop,isPublic,markdown]);
        res.send({ error_code: 1 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/register', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let user = await User.findOne(req.body.username);
        if (user) {
            throw 2008;
        }
        else {
            let options = [req.body.username, req.body.password];
            let resualt = await User.insertOne(options);
            options = [req.body.username, req.body.password, req.body.nick, '0.0.0.0'];
            resualt = await UsersOld.insertOne(options);
            req.session.loginuser = req.body.username;
            req.session.privilege = user.privilege;
            throw 0;
        }
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/userEdit', async function (req, res, next) {
    console.log('submit');
    var indexContext = {};
    indexContext.title = '个人中心 - hnistoj';
    try {
        let uid = req.body.username;
        let nick = req.body.nick;
        let email = req.body.email;
        let password = req.body.password;
        let passwordOld = req.body.passwordOld;
        let user = await User.findOne(uid);
        console.log(password);
        indexContext.menuActive = '';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        if (indexContext.loginuser == uid) {
            if (passwordOld != 'd41d8cd98f00b204e9800998ecf8427e') {
                if (passwordOld == user.password) {
                    let resualt = await UsersOld.updateWhere([nick, email, uid]);
                    resualt = await User.updateWhere([password, uid]);
                    console.log('passwordOld==user.password');
                }
                else {
                    console.log(user.password);
                    console.log(passwordOld);
                    throw 2008;
                }
            }
            else {
                console.log('!passwordOld');
                let resualt = await UsersOld.updateWhere([nick, email, uid]);
            }
        }
        res.send({ error_code: 0 });
    }
    catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

module.exports = router;