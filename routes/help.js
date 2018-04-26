var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '帮助 - hnistoj';
    try {
        indexContext.menuActive = 'help';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('help', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;
