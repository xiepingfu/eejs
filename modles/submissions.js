var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData() {
    let sql = 'SELECT * FROM solution ORDER BY solution_id DESC';
    let dataList = await mysql.query(sql);
    return dataList;
}

async function selectCount(uid) {
    let sql = 'SELECT result,count(*) as count FROM solution  WHERE user_id=? GROUP BY result';
    let dataList = await mysql.query(sql,uid);
    return dataList;
}

async function selectWhere(options) {
    let sql = 'SELECT * FROM solution WHERE problem_id like ? AND user_id like ? AND language like ? AND result like ? ORDER BY solution_id DESC';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

exports.selectAllData=selectAllData;
exports.selectWhere=selectWhere;
exports.selectCount=selectCount;