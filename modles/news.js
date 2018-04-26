var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData() {
    let sql = 'SELECT * FROM news ORDER BY time DESC';
    let dataList = await mysql.query(sql);
    return dataList;
}

async function selectCount() {
    let sql = 'SELECT * FROM news ORDER BY news_id DESC LIMIT 1';
    let dataList = await mysql.query(sql);
    return dataList[0];
}

async function selectWhere(options) {
    let sql = 'SELECT * FROM news WHERE news_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function deleteWhere(options) {
    let sql = 'DELETE FROM news WHERE news_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function changeTop(options) {
    let sql = 'UPDATE news set importance=? WHERE news_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function changePublic(options) {
    let sql = 'UPDATE news set defunct=? WHERE news_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function updateWhere(options) {
    let sql = 'UPDATE news SET title=?,content=?,time=?,importance=?,defunct=?,markdown=? WHERE news_id=?';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

async function insertOne(options) {
    let sql = 'INSERT INTO news (user_id,title,content,time,importance,defunct,markdown) VALUES(?,?,?,?,?,?,?)';
    let dataList = await mysql.query(sql,options);
    return dataList;
}

exports.selectWhere=selectWhere;
exports.insertOne=insertOne;
exports.updateWhere=updateWhere;
exports.selectAllData=selectAllData;
exports.deleteWhere=deleteWhere;
exports.changeTop=changeTop;
exports.changePublic=changePublic;
exports.selectCount=selectCount;
