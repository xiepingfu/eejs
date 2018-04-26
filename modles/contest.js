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

async function Cproblems(addsql) {
    var ti = new Date().toLocaleString();
    let sql = 'SELECT problem.* FROM contest_problem JOIN problem ON contest_problem.problem_id=problem.problem_id WHERE contest_problem.contest_id = ? ORDER BY contest_problem.num';
    let problems = await mysql.query(sql,addsql);
    return problems;
}

exports.selectAllData = selectAllData;
exports.selectWhere = selectWhere;
exports.Cproblems = Cproblems;