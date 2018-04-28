var express = require('express');
var mysql = require('../config/mysql');

var ti = new Date().toLocaleString();

async function selectAllData(options) {
    let sql = 'SELECT problem_id,title,accepted,submit,solved,source,defunct FROM problem WHERE problem_id>=? AND problem_id<? ORDER BY problem_id ASC ';
    let problems = await mysql.query(sql,options);
    return problems;
}

async function selectCount() {
    let sql = 'SELECT count(*) AS count  FROM problem';
    let problems = await mysql.query(sql);
    return problems;
}

async function findOne(options) {
    let sql = 'SELECT * FROM problem WHERE problem_id = ?';
    let problems = await mysql.query(sql,[options]);
    return problems;
}

async function changePublic(options) {
    let sql = 'UPDATE problem SET defunct=? WHERE problem_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function deleteWhere(options) {
    let sql = 'DELETE FROM problem WHERE problem_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function insertNew(options) {
    let sql = 'INSERT INTO problem(title,time_limit,memory_limit,markdown,description,input,output,sample_input,sample_output,hint,source,defunct,in_date) \
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NOW())';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

exports.selectAllData = selectAllData;
exports.selectCount = selectCount;
exports.findOne = findOne;
exports.changePublic = changePublic;
exports.deleteWhere = deleteWhere;
exports.insertNew = insertNew;
