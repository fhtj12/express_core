var exception = require('../system/exception');

/**
 * 특정 변수가 비어있는지 검사.
 * @param {Object} object 
 * 
 * @author tirico
 */
var isEmpty = function(object) {
    if(object === null || object === undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * 필수 인자 유무 검사.
 * @param {Map or Array} data @description
 * @param {Array} key_array @description
 * 
 * @description 이 함수는 Map 혹은 Array 타입의 컬렉션 내부에 반드시 있어야 하는 데이터가 존재하는지 확인하는 함수입니다.
 * 
 * @author tirico
 */
var checkArgs = function(data, key_array) {
    if(key_array instanceof Array) {

        if(data instanceof Map) {
            data.forEach((value, key, mapObject) => {
                if(isEmpty(value)) {
                    throw exception('CME1003', [key]); // CME1003=Necessary Parameter is Empty : {0}
                }
            });
        } else if(key_array instanceof Array) {
            key_array.forEach((item, index, array) => {
                if(isEmpty(item)) {
                    throw exception('CME1003', [index]); // CME1003=Necessary Parameter is Empty : {0}
                }
            });
        } else {
            throw exception('CME2001'); // CME2001=Invalid Type argument
        }
    } else {
        throw exception('CME2001'); // CME2001=Invalid Type argument
    }
}

/**
 * Map 혹은 Array 타입의 컬렉션 형태의 변수들이 비어있는 부분이 있는지 확인.
 * @param {Map or Array} data
 * 
 * @author tirico
 */
var checkArgsEmpty = function(data) {
    if(data instanceof Map) {
        data.forEach((value, key, mapObject) => {
            if(isEmpty(value)) {
                throw exception('CME1003', [key]); // CME1003=Necessary Parameter is Empty : {0}
            }
        });
    } else if(data instanceof Array) {
        data.forEach((item, index, array) => {
            if(isEmpty(item)) {
                throw exception('CME1003', [index]); // CME1003=Necessary Parameter is Empty : {0}
            }
        });
    } else {
        throw exception('CME2001'); // CME2001=Invalid Type argument
    }
}

module.exports = {
    isEmpty : isEmpty,
    checkArgs : checkArgs,
    checkArgsEmpty : checkArgsEmpty
}