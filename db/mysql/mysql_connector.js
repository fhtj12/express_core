const mysql = require('mysql');

const dbConfig = require('./mysql_config');
const mybatis = require('./mybatis');

const db_pool = mysql.createPool(dbConfig);

mybatis.createMapper();

const select = function(namespace, query_name, param) {
    return new Promise(function(resolve, reject) {
        db_pool.getConnection(function(err, connection, callback) {
            if(!err) {
                const query = mybatis.getStatement(namespace, query_name, param);
                connection.query(query, function(err, results, fields, callback) {
                    connection.release();
                    resolve(results);
                });
            } else {
                connection.release();
                reject('MDE0001'); // MDE0001=mysql connection failed.
            }
        });
    });
}

// var insert = function(namespace, query_name, param) {
//     return new Promise(function(resolve, reject) {
//         db_pool.getConnection(function(err, connection, callback) {
//             if(!err) {
//                 var query = mybatis.getStatement(namespace, query_name, param);
//                 connection.beginTransaction(function(err) {
//                     if(err) {
//                         connection.release();
//                         reject('MDE0002'); // MDE0002=mysql transaction begin failed.
//                     }
//                     connection.query(query, function(err, results, fields, callback) {
//                         connection.release();
//                         resolve(results);
//                     });
//                 });
//             } else {
//                 connection.release();
//                 reject('MDE0001'); // MDE0001=mysql connection failed.
//             }
//         });
//     });
// }

module.exports =  {
    select : select
}
