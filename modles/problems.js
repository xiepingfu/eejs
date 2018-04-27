var express = require('express');
var mysql = require('../config/mysql');

var ti = new Date().toLocaleString();

async function selectAllData(options) {
    let sql = 'SELECT problem_id,title,accepted,submit,solved,source FROM problem WHERE problem_id>=? AND problem_id<? ORDER BY problem_id ASC ';
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

exports.selectAllData = selectAllData;
exports.selectCount = selectCount;
exports.findOne = findOne;
