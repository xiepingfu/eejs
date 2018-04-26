var mysql = require('mysql');   // 引用mysql模块。注意要先安装mysql： npm install mysql
var config = require('./db');

var onelib_pool = mysql.createPool(config.hnistoj);

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        onelib_pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows);
                    }
                    connection.release()
                })
            }
        })
    })
}

exports.onelib_pool = onelib_pool;
exports.query = query;