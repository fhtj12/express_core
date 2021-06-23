/**
 * @description 사용자 지정 예외 처리.
 */

const message = require('../system/message_manager');

/**
 * Key 만으로 메세지를 불러와 Error 객체를 반환하는 함수.
 * @param {String} key 
 * 
 * @author tirico
 */
const getError = function(key) {
    if(key === null || key === undefined) {
        return new Error('CME0002'); // CME0002=Error Key is Empty
    }

    return new Error(key + ':' + message(key));
}

/**
 * Key로 메세지를 불러와 메세지의 포맷에 맞게 값을 넣어준 후 Error 객체를 반환하는 함수.
 * @param {String} key 
 * @param {Array} param 
 * 
 * @description 
 * CME1003={0} : a, b : [{1}], $^%&*# : {2} 와 같은 메세지가 있을 경우
 * throw exception('CME1003', ['abc', 'def', 'ghi']); 와 같은 형태로 사용하면 됩니다.
 * 
 * @author tirico
 */
const getErrorWithFormat = function(key, param) {
    if(key === null || key === undefined) {
        return new Error('CME0002'); // CME0002=Error Key is Empty
    }

    return new Error(message(key, param));
}

/**
 * 사용자 정의 예외처리.
 * @param {String} key @description [필수] properties 파일에 정의된 에러 코드의 Key를 넣으십시오.
 * @param {Array} param @description [선택] 에러 메세지에 포맷대로 인자를 넣고 싶다면 이 값을 넣으십시오.
 * 
 * @description arguments 객체를 이용하여 overloading 처럼 구현 하였습니다.
 * 
 * @author tirico
 */
module.exports = function() {
    const length = arguments.length;

    switch(length) {
        case 1:
            return getError(arguments[0]);
        case 2:
            return getErrorWithFormat(arguments[0], arguments[1]);
        default:
            return getError(message['CME0003']); // CME0003=Undefined Function
    }
}
