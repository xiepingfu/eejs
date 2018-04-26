var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData() {
    let sql = 'SELECT * FROM users_new';
    let dataList = await mysql.query(sql);
    return dataList;
}


async function findOne(username) {
    let sql = 'SELECT * FROM users_new where user_id = ?';
    let dataList = await mysql.query(sql,[username]);
    return dataList[0];
}


async function insertOne(options) {
    let sql = 'INSERT INTO users_new (user_id,password) VALUES (?,?)';
    let dataList = await mysql.query(sql,options);
    return dataList[0];
}

async function updateWhere(options) {
    let sql = 'UPDATE users_new SET password=? WHERE user_id = ?';
    let dataList = await mysql.query(sql,options);
    return dataList[0];
}

async function solved(options) {
    let sql = 'SELECT problem_id,count(1) from solution where user_id=? and result=4 group by problem_id ORDER BY problem_id ASC';
    let dataList = await mysql.query(sql,options);
    return dataList[0];
}


//SELECT `problem_id`,count(1) from solution where `user_id`=? and result=4 group by `problem_id` ORDER BY `problem_id` ASC;

exports.updateWhere=updateWhere;
exports.selectAllData=selectAllData;
exports.findOne=findOne;
exports.insertOne=insertOne;
exports.solved=solved;
