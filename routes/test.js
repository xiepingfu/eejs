// 引用tasks模型
var Task = require('../models/test');

// 根据taskid获取任务数据
exports.getTask = function(req, res) {
    var taskid = req.params.taskid;
    var task = new Task();
    task.find(taskid,function(err,result){
        if(err){
            res.send('没有找到taskid为'+taskid+'的任务');
        }
        else if(undefined!=result){ // 增加这个判断，否则在没有查询到的情况下，Node.js会挂掉
            res.send(result.length === 1 ? result[0]:result);
        }
        else{
            res.end("Error");
        }
    });
}