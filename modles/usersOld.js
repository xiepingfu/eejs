var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData() {
    let sql = 'SELECT * FROM users ORDER BY solved DESC';
    let dataList = await mysql.query(sql);
    return dataList;
}

async function indexRankList() {
    let sql = 'SELECT * FROM users ORDER BY solved DESC LIMIT 10';
    let dataList = await mysql.query(sql);
    return dataList;
}


async function selectLike(username) {
    let sql = 'SELECT * FROM users where user_id like \'%'+username+'%\' OR nick like \'%'+username+'%\' ';
    let dataList = await mysql.query(sql,[username,username]);
    return dataList;
}

async function findOne(username) {
    let sql = 'SELECT * FROM users where user_id = ?';
    let dataList = await mysql.query(sql,[username]);
    return dataList[0];
}

async function insertOne(options) {
    let sql = 'INSERT INTO users (user_id,password,nick,ip) VALUES (?,?,?,?)';
    let dataList = await mysql.query(sql,options);
    return dataList[0];
}

async function updateWhere(options) {
    let sql = 'UPDATE users set nick=?,email=? WHERE user_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList[0];
}

exports.selectAllData=selectAllData;
exports.updateWhere=updateWhere;
exports.findOne=findOne;
exports.selectLike=selectLike;
exports.insertOne=insertOne;
exports.indexRankList=indexRankList;