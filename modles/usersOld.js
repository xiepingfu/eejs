var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData() {
    let sql = 'SELECT * FROM users ORDER BY solved DESC';
    let dataList = await mysql.query(sql);
    return dataList;
}

async function selectLimit(options) {
    let sql = 'SELECT * FROM users ORDER BY solved DESC LIMIT ?,?';
    let dataList = await mysql.query(sql,options);
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

async function countAll() {
    let sql = 'SELECT COUNT(*) AS count FROM users';
    let dataList = await mysql.query(sql);
    return dataList[0].count;
}

async function changePublic(options) {
    let sql = 'UPDATE users SET defunct=? WHERE user_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function changePassword(options) {
    let sql = 'UPDATE users_new SET password=? WHERE user_id=?';
    let dataList = await mysql.query(sql,options);
    sql = 'UPDATE users SET password=? WHERE user_id=?';
    dataList = await mysql.query(sql,options);
    return dataList;
}

async function deleteWhere(options) {
    let sql = 'DELETE FROM users  WHERE user_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

exports.selectAllData=selectAllData;
exports.updateWhere=updateWhere;
exports.findOne=findOne;
exports.selectLike=selectLike;
exports.insertOne=insertOne;
exports.indexRankList=indexRankList;
exports.selectLimit=selectLimit;
exports.countAll=countAll;
exports.changePublic=changePublic;
exports.deleteWhere=deleteWhere;
exports.changePassword=changePassword;