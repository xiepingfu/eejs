var express = require('express');
var mysql = require('../config/mysql');

async function selectAllData(options) {
    let sqlwhere = "WHERE solution_id>0 ";
    if (options.pid) sqlwhere += "AND problem_id='" + options.pid + "' ";
    if (options.uid) sqlwhere += "AND user_id='" + options.uid + "' ";
    if (options.lan) sqlwhere += "AND language='" + options.language + "' ";
    if (options.sta) sqlwhere += "AND result='" + options.sta + "' ";
    if (options.cid) sqlwhere += "AND contest_id='" + options.cid + "' ";

    let sql = "SELECT * FROM solution " + sqlwhere + " ORDER BY solution_id DESC LIMIT " + (options.page - 1) * 30 + ",30";
    let dataList = await mysql.query(sql, options);
    return dataList;
}

async function selectAllCount(options) {
    let sqlwhere = "WHERE solution_id>0 ";
    if (options.pid) sqlwhere += "AND problem_id='" + options.pid + "' ";
    if (options.uid) sqlwhere += "AND user_id='" + options.uid + "' ";
    if (options.lan) sqlwhere += "AND language='" + options.language + "' ";
    if (options.sta) sqlwhere += "AND result='" + options.sta + "' ";
    if (options.cid) sqlwhere += "AND contest_id='" + options.cid + "' ";

    let sql = "SELECT COUNT(*) AS count FROM solution " + sqlwhere;
    let dataList = await mysql.query(sql);
    return dataList[0].count;
}

async function selectCount(uid) {
    let sql = 'SELECT result,count(*) as count FROM solution  WHERE user_id=? GROUP BY result';
    let dataList = await mysql.query(sql, uid);
    return dataList;
}

async function selectWhere(options) {
    let sql = 'SELECT * FROM solution WHERE problem_id like ? AND user_id like ? AND language like ? AND result like ? AND contest_id like ? ORDER BY solution_id DESC';
    let dataList = await mysql.query(sql, options);
    return dataList;
}

async function insertNew(options) {
    let sql;
    let dataList;
    console.log(options.contest_id);
    if (options.contest_id) {
        sql = 'INSERT INTO solution(problem_id,user_id,in_date,language,ip,code_length,result,contest_id,num) VALUES(?,?,NOW(),?,?,?,14,?,?)';
        dataList = await mysql.query(sql, [options.problem_id, options.user_id, options.language, options.ip, options.code_length, options.contest_id, options.pnum]);
    } else {
        sql = 'INSERT INTO solution(problem_id,user_id,in_date,language,ip,code_length,result) VALUES(?,?,NOW(),?,?,?,14)';
        dataList = await mysql.query(sql, [options.problem_id, options.user_id, options.language, options.ip, options.code_length]);
    }
    sql = 'SELECT MAX(solution_id) AS solution_id FROM solution';
    dataList = await mysql.query(sql);
    let solution_id = dataList[0].solution_id;
    sql = "INSERT INTO `source_code_user`(`solution_id`,`source`)VALUES(?,?)";
    dataList = await mysql.query(sql, [solution_id, options.code]);
    sql = "INSERT INTO `source_code`(`solution_id`,`source`)VALUES(?,?)";
    dataList = await mysql.query(sql, [solution_id, options.code]);
    sql = "UPDATE solution SET result=0 WHERE solution_id=?";
    dataList = await mysql.query(sql, [solution_id]);
    return dataList;
}

async function selectSource(options) {
    let sql = 'SELECT source FROM source_code WHERE solution_id=?';
    let dataList = await mysql.query(sql, options);
    return dataList[0].source;
}

async function findOne(options) {
    let sql = 'SELECT * FROM solution WHERE solution_id=?';
    let dataList = await mysql.query(sql, options);
    return dataList;
}

async function contestRanklist(options) {
    let sql = "SELECT\
    users.user_id,users.nick,solution.result,solution.num,solution.in_date,solution.pass_rate\
            FROM\
                    (select * from solution where solution.contest_id=? and num>=0 and problem_id>0 AND result IN(4,5,6,7,8,9,10)) solution\
            inner join users\
            on users.user_id=solution.user_id and users.defunct='N'\
    ORDER BY users.user_id,in_date";
    let dataList = await mysql.query(sql, options);
    return dataList;
}

exports.selectAllCount = selectAllCount;
exports.insertNew = insertNew;
exports.selectAllData = selectAllData;
exports.selectWhere = selectWhere;
exports.selectCount = selectCount;
exports.selectSource = selectSource;
exports.findOne = findOne;
exports.contestRanklist = contestRanklist;