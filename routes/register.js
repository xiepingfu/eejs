var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var indexContext={};
    indexContext.title='注册 - hnistoj'
    indexContext.menuActive='';
    indexContext.loginuser='';
    indexContext.privilege = 0;
    if(req.session.loginuser)
    {
        indexContext.loginuser=req.session.loginuser;
        indexContext.privilege=req.session.privilege;
    }
    res.render('register',indexContext);
});


module.exports = router;