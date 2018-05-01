module.exports = {
    hnistoj: {
        host: '127.0.0.1',      // MySQL所在服务器IP
        //host: '101.200.55.0',      // MySQL所在服务器IP
//        user: 'remote',           // 用户名
        user: 'root',           // 用户名
        password: 'xie970227',           // 密码
       // database:'jol',      // 数据库名称
        database:'hnistoj',      // 数据库名称
        port: 3306,             // 端口号
        dateStrings: true,      // 时间以字符串形式显示，否则会有类似这样的显示：Thu Apr 14 2016 00:00:00 GMT+0800 (中国标准时间) 17:20:12
    }
};