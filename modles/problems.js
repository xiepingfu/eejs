var express = require('express');
var mysql = require('../config/mysql');

var ti = new Date().toLocaleString();

async function selectAllData(addsql) {
    let sql = 'SELECT * FROM problem ORDER BY problem_id ASC ' + addsql;
    let problems = await mysql.query(sql);
    return problems;
}

async function findOne(options) {
    let sql = 'SELECT * FROM problem WHERE problem_id = ?';
    let problems = await mysql.query(sql,[options]);
    return problems;
}

exports.selectAllData = selectAllData;
exports.findOne = findOne;
