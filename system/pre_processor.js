const mysql = require('mysql');

const util = require('../util/util');
const collection_util = require('../util/collection_util');

/**
 * 전처리 함수.
 * 
 * @param {String} url @description 요청 URL입니다.
 * @param {Array} arg_array @description API 에서 반드시 써야할 데이터의 Key 모음입니다. Key가 있는지 없는지 값이 비어있지는 않은지 체크합니다.
 * @param {boolean} session_check @description API가 호출되었을 때, 세션을 검사해야 할 필요가 있을 경우 이 값을 true로 하십시오.
 * @returns {Promise}
 *  
 * @description 이 함수는 모든 API가 호출 될 때, 가장 먼저 호출되어야 합니다. 이곳에서는 세션을 갱신시키지 않고, 검사만 합니다.
 * 
 * @author tirico
 */
const process = function(url, arg_array, session_check) {
    return new Promise(function(resolve, reject) {
        try {

            // request query to Map
            const url_query_map = collection_util.objToMap(url.query);

            // url query escape
            let escaped_query_map = new Map();
            url_query_map.forEach((value, key, mapObject) => {
                escaped_query_map.set(mysql.escape(key), mysql.escape(value));
            });

            util.checkArgsEmpty(escaped_query_map);

            // check query argument
            if(!util.isEmpty(arg_array)) {
                util.checkArgs(escaped_query_map, arg_array);
            }

            // session check
            if(session_check) {
                
            }

            // begin mysql transaction

            // logging, resolve

        } catch (exception) {
            console.log(exception);
            reject(exception);
        }
    });
}

module.exports = {
    process : process
}
