var express = require('express');
var router = express.Router();
var User = require('../modles/users');
var UsersOld = require('../modles/usersOld');

router.post('/login', async (req, res) => {
    var error_code = 1001;
    try {
        let Users = require('../modles/usersOld');
        let user = await UsersOld.login(req.body.username);
        if (user) {
            error_code = 1002;
            if (user.defunct == 'Y') {
                throw 2;
            }
            if (user.password == req.body.password) {
                error_code = 1;
                req.session.loginuser = req.body.username;
                req.session.privilege = user.privilege;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({ error_code: error_code });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.get('/loginout', async (req, res) => {
    try {
        req.session.destroy();
        res.setHeader('Content-Type', 'application/json');
        res.send({ error_code: 0 });
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
        let isTop = 0;
        if (req.body.checked == 'false') {
            isTop = 1;
            console.log(req.body.checked);
        }
        let resualt = await News.changeTop([isTop, req.body.news_id]);
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
        let isPublic = 'Y';
        if (req.body.checked == 'false') {
            isPublic = 'N';
        }
        let resualt = await News.changePublic([isPublic, req.body.news_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/problem/public', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Problems = require('../modles/problems');
        let isPublic = 'Y';
        if (req.body.checked == 'false') {
            isPublic = 'N';
        }
        console.log(isPublic);
        let resualt = await Problems.changePublic([isPublic, req.body.problem_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/contest/public', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Contests = require('../modles/contest');
        let isPublic = 'Y';
        if (req.body.checked == 'false') {
            isPublic = 'N';
        }
        console.log(req.body.contest_id);
        let resualt = await Contests.changePublic([isPublic, req.body.contest_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/user/public', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let User = require('../modles/usersOld');
        let isPublic = 'Y';
        if (req.body.checked == 'true') {
            isPublic = 'N';
        }
        console.log(isPublic);
        let resualt = await User.changePublic([isPublic, req.body.user_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/user/delete', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let User = require('../modles/usersOld');
        let resualt = await User.deleteWhere([req.body.user_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/user/chpwd', async (req, res) => {
    try {
        //alert(md5('hnistoj')); dd9dfe76e5c758f8f4918db972468156
        var defpwd = "dd9dfe76e5c758f8f4918db972468156";//hnistoj
        res.setHeader('Content-Type', 'application/json');
        let User = require('../modles/usersOld');
        let resualt = await User.changePassword([defpwd, req.body.user_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/contest/delete', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Contests = require('../modles/contest');
        let resualt = await Contests.deleteWhere([req.body.contest_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/problem/delete', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Problems = require('../modles/problems');
        let resualt = await Problems.deleteWhere([req.body.problem_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/problem/add', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Problems = require('../modles/problems');
        let isPublic = "Y";
        if (req.body.isPublic == 'true')
            isPublic = "N";
        let resualt = Problems.insertNew([req.body.title, req.body.time_limit, req.body.memory_limit, req.body.markdown, req.body.description, req.body.input, req.body.output, req.body.sample_input,
        req.body.sample_output, req.body.hint, req.body.source, isPublic]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/contest/edit', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Contests = require('../modles/contest');
        let start_time = new Date(req.body.start_time).toLocaleString();
        let end_time = new Date(req.body.end_time).toLocaleString();
        let resualt = Contests.updateWhere([req.body.title, req.body.description, start_time, end_time, req.body.isPublic, req.body.language, req.body.password, req.body.contest_id]);
        res.send({ error_code: 0 });
    } catch (e) {
        console.log(e);
        res.send({ error_code: e });
    }
});

router.post('/contest/add', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let Contests = require('../modles/contest');
        let start_time = new Date(req.body.start_time).toLocaleString();
        let end_time = new Date(req.body.end_time).toLocaleString();
        console.log('add');
        let resualt = await Contests.insertNew([req.body.title, req.body.description, start_time, end_time, req.body.isPublic, req.body.language, req.body.password]);
        let cid = await Contests.getMaxCID();
        let contest_problems = [];
        var temps = req.body.Cproblems;
        var patt = /[0-9]+/g;
        while ((tmp = patt.exec(temps)) != null) {
            contest_problems.push(tmp)
        }
        resualt = await Contests.deleteCproblems(cid);
        contest_problems.forEach(function (item, index) {
            console.log(item[0]);
            resualt = Contests.insertCproblems([cid, item[0], index]);
        });
        res.send({ error_code: contest_problems });
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
        if (isPublic == 'false') isPublic = 'Y';
        else isPublic = 'N';
        if (isTop == 'false') isTop = 0;
        else isTop = 1;
        let News = require('../modles/news');
        var ti = new Date().toLocaleString();
        var resualt = await News.updateWhere([title, content, ti, isTop, isPublic, markdown, news_id]);
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
        if (isPublic == 'false') isPublic = 'Y';
        else isPublic = 'N';
        if (isTop == 'false') isTop = 0;
        else isTop = 1;
        let News = require('../modles/news');
        var ti = new Date().toLocaleString();
        var resualt = await News.insertOne([uid, title, content, ti, isTop, isPublic, markdown]);
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

router.post('/submitCode', async function (req, res, next) {
    try {
        console.log('submit code');
        var lanCode = {
            'cpp': 1,
            'c': 0,
            'java': 3
        };
        let options = {};
        options.code = req.body.code;
        options.language = lanCode[req.body.language];
        options.problem_id = req.body.problem_id;
        options.user_id = req.session.loginuser;
        options.in_data = new Date().toLocaleString();
        options.code_length = options.code.length;
        options.ip = '0.0.0.0';
        console.log(req.body.contest_id);
        if (req.body.contest_id) {
            options.contest_id = req.body.contest_id;
            options.pnum=req.body.pnum;
        }
        console.log(req.body.pnum);
        let Sub = require('../modles/submissions');
        let resualt = await Sub.insertNew(options);
        console.log(resualt);
        res.send({ error_code: 0 });

    }
    catch (e) {
        console.log(e);
    }
});

function RANKER() {
    let ranker = new Object;
    ranker.user_id="";
    ranker.solved=0;
    ranker.total_fraction=0;
    ranker.total_time=0;
    ranker.time=new Array;
    ranker.fraction=new Array;
    return ranker;
}

router.get('/contest/ranklist', async function (req, res, next) {
    console.log('ranklist');
    try {
        let Submissions = require('../modles/submissions');
        let sub = Submissions.contestRanklist(req.body.contest_id);
    } catch (error) {
        
    }
});


router.post('/userEdit', async function (req, res, next) {
    console.log('submit');
    try {
        let uid = req.body.username;
        let nick = req.body.nick;
        let email = req.body.email;
        let password = req.body.password;
        let passwordOld = req.body.passwordOld;
        let user = await User.findOne(uid);
        if (req.session.loginuser == uid) {
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

var multer = require('multer');
var uploadFolder = './upload/';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.post('/upload', upload.single('logo'), function (req, res, next) {
    console.log(req.file);
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ ret_code: '0' });
});

module.exports = router;