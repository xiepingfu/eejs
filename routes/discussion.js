var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var indexContext = {};
    indexContext.title = '讨论 - hnistoj';
    try {
        indexContext.menuActive = 'discussion';
        indexContext.loginuser = '';
        indexContext.privilege = 0;
        if (req.session.loginuser)
        {
            indexContext.loginuser = req.session.loginuser;
            indexContext.privilege = req.session.privilege;
        }
        res.render('discussion', indexContext);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;
