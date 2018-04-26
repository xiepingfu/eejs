var express = require('express');
var router = express.Router();
var News = require('../modles/news');

router.get('/:id', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '首页 - hnistoj';
    try {
        let id = req.params.id;
        let news = await News.selectWhere(id);
        console.log(news);
        indexContext.menuActive = '';
        indexContext.news=news[0];
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser) {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('notice', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;