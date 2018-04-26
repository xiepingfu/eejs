var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var indexContext={};
    indexContext.title='登录 - hnistoj'
    indexContext.menuActive='';
    indexContext.loginuser='';
    indexContext.privilege = 0;
    if(req.session.loginuser)
    {
        indexContext.loginuser=req.session.loginuser;
        indexContext.privilege=req.session.privilege;
    }
    res.render('login',indexContext);
});


module.exports = router;