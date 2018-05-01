var express = require('express');
var mysql = require('../config/mysql');


async function selectAllData(addsql) {
    var ti = new Date().toLocaleString();
    let sql = 'SELECT * FROM contest ORDER BY end_time DESC ' + addsql;
    let contests = await mysql.query(sql);
    if (contests) {
        for (var i = 0; i < contests.length; i++) {
            var et = new Date(contests[i].end_time).toLocaleString();
            var st = new Date(contests[i].start_time).toLocaleString();
            if (et <= ti) {
                contests[i].statu = 1;//end
            }
            else if (st <= ti) {
                contests[i].statu = 2;//running
            }
            else {
                contests[i].statu = 3;//no start
            }
        }
    }
    return contests;
}

async function selectWhere(addsql) {
    var ti = new Date().toLocaleString();
    let sql = 'SELECT * FROM contest WHERE contest_id = ? ';
    let contests = await mysql.query(sql,addsql);
    if (contests) {
        for (var i = 0; i < contests.length; i++) {
            if (contests[i].end_time <= ti) {
                contests[i].statu = 1;//end
            }
            else if (contests[i].start_tme <= ti) {
                contests[i].statu = 2;//running
            }
            else {
                contests[i].statu = 3;//no start
            }
        }
    }
    return contests;
}

async function Cproblems(options) {
    var ti = new Date().toLocaleString();
    let sql = "select * from (SELECT `problem`.`title` as `title`,`problem`.`problem_id` as `pid`,source as source,contest_problem.num as pnum\
    FROM `contest_problem`,`problem`\
    WHERE `contest_problem`.`problem_id`=`problem`.`problem_id` \
    AND `contest_problem`.`contest_id`=? ORDER BY `contest_problem`.`num` \
            ) problem\
            left join (select problem_id pid1,count(distinct(user_id)) accepted from solution where result=4 and contest_id=? group by pid1) p1 on problem.pid=p1.pid1\
            left join (select problem_id pid2,count(1) submit from solution where contest_id=? group by pid2) p2 on problem.pid=p2.pid2\
    order by pnum";
    let problems = await mysql.query(sql,options);
    return problems;
}

async function changePublic(options) {
    let sql = 'UPDATE contest SET defunct=? WHERE contest_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function deleteWhere(options) {
    let sql = 'DELETE FROM contest WHERE contest_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function updateWhere(options) {
    let sql = "UPDATE `contest` set `title`=?,description=?,`start_time`=?,`end_time`=?,`private`=?,`langmask`=? ,password=? WHERE `contest_id`=?";
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function insertNew(options) {
    let sql = "insert INTO `contest`(`title`,`description`,`start_time`,`end_time`,`private`,`langmask`,`password`) VALUES(?,?,?,?,?,?,?)";
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function insertCproblems(options) {
    let sql = "INSERT INTO `contest_problem`(`contest_id`,`problem_id`,`num`) VALUES (?,?,?)";
    let dataList = await mysql.query(sql,options);
    return dataList;
}


async function deleteCproblems(options) {
    let sql = "DELETE FROM contest_problem WHERE contest_id=?";
    let dataList = await mysql.query(sql,options[0]);
    return dataList;
}

async function getMaxCID() {
    let sql = "SELECT MAX(contest_id) AS cid FROM contest";
    let dataList = await mysql.query(sql);
    return dataList[0].cid;
}

async function Count() {
    let sql = "SELECT COUNT(*) AS count FROM contest WHERE defunct='N' ";
    let dataList = await mysql.query(sql);
    return dataList[0].count;
}

async function Contests(options) {
    var ti = new Date().toLocaleString();
    let sql = "SELECT * FROM contest WHERE defunct='N' ORDER BY end_time DESC LIMIT ?,15";
    let contests = await mysql.query(sql,options);
    if (contests) {
        for (var i = 0; i < contests.length; i++) {
            if (contests[i].end_time <= ti) {
                contests[i].statu = 1;//end
            }
            else if (contests[i].start_tme <= ti) {
                contests[i].statu = 2;//running
            }
            else {
                contests[i].statu = 3;//no start
            }
        }
    }
    return contests;
}

exports.selectAllData = selectAllData;
exports.selectWhere = selectWhere;
exports.Cproblems = Cproblems;
exports.changePublic = changePublic;
exports.deleteWhere = deleteWhere;
exports.updateWhere = updateWhere;
exports.insertNew = insertNew;
exports.getMaxCID = getMaxCID;
exports.insertCproblems = insertCproblems;
exports.deleteCproblems = deleteCproblems;
exports.Count = Count;
exports.Contests = Contests;