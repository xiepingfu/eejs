var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData(options) {
    let sql = 'SELECT * FROM solution WHERE solution_id>=? AND solution_id<=? ORDER BY solution_id DESC';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function selectAllCount() {
    let sql = 'SELECT COUNT(*) AS count FROM solution';
    let dataList = await mysql.query(sql);
    return dataList;
}

async function selectCount(uid) {
    let sql = 'SELECT result,count(*) as count FROM solution  WHERE user_id=? GROUP BY result';
    let dataList = await mysql.query(sql,uid);
    return dataList;
}

async function selectWhere(options) {
    let sql = 'SELECT * FROM solution WHERE problem_id like ? AND user_id like ? AND language like ? AND result like ? AND contest_id like ? ORDER BY solution_id DESC';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function insertNew(options) {
    let sql = 'INSERT INTO solution(problem_id,user_id,in_date,language,ip,code_length,result) VALUES(?,?,NOW(),?,?,?,0)';
    let dataList = await mysql.query(sql,[options.problem_id,options.user_id,options.language,options.ip,options.code_length]);
    sql = 'SELECT MAX(solution_id) AS solution_id FROM solution';
    dataList = await mysql.query(sql);
    let solution_id = dataList[0].solution_id;
    sql = "INSERT INTO `source_code_user`(`solution_id`,`source`)VALUES(?,?)";
    dataList = await mysql.query(sql,[solution_id,options.code]);
    sql = "INSERT INTO `source_code`(`solution_id`,`source`)VALUES(?,?)";
    dataList = await mysql.query(sql,[solution_id,options.code]);
    return dataList;
}

exports.selectAllCount=selectAllCount;
exports.insertNew=insertNew;
exports.selectAllData=selectAllData;
exports.selectWhere=selectWhere;
exports.selectCount=selectCount;