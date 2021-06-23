/**
 * @description 서버 메세지 매니저
 */
const message = require('./properties_manager').message;

// 메세지 포맷화 하기
const message_format = require('messageformat');
const mf_basic = new message_format(82); // 국가번호 82번

/**
 * Key 만으로 메세지를 불러와 메세지를 반환하는 함수.
 * @param {String} key 
 * 
 * @author tirico
 */
const getMessage = function(key) {
    if(key === null || key === undefined) {
        throw new Error(message['CME0002']); // CME0002=Message Key is Empty
    }

    const msg = message[key];

    if(msg === null || msg === undefined) {
        throw new Error(message['CME0001'] + ':' + key); // CME0001=Undefined Message
    }

    return message[key];
}

/**
 * Key로 메세지를 불러와 메세지의 포맷에 맞게 값을 넣어준 후 반환하는 함수.
 * @param {String} key 
 * @param {Array} param 
 * 
 * @description 기본 locale 은 82번 한국입니다. 만약 이를 변경하여 사용하고 싶을 경우 함수 호출 인자 마지막에 locale 번호를 넣어주십시오.
 * 예) CME1003={0} : a, b : [{1}], $^%&*# : {2} 와 같은 메세지가 있을 경우
 * message('CME1003', ['abc', 'def', 'ghi']); 와 같은 형태로 사용하면 됩니다.
 * 
 * @author tirico
 */
const getMessageWithFormat = function(key, param) {
    if(key === null || key === undefined) {
        throw new Error(message['CME0002']); // CME0002=Message Key is Empty
    }

    const msg_src = message[key];

    if(msg_src === null || msg_src === undefined) {
        throw new Error(message['CME0001'] + ':' + key); // CME0001=Undefined Message
    }

    const msg = mf_basic.compile(msg_src);

    let json;
    if(param instanceof Array) {
        json = JSON.stringify(param);
    } else {
        throw new Error(message['CME2001']); // CME2001= Invalid Type argument
    }

    return msg(JSON.parse(json));
}

/**
 * Key로 메세지를 불러와 메세지의 포맷에 맞게 값을 넣어준 후 반환하는 함수. (locale 설정 가능.)
 * @param {String} key 
 * @param {Array} param 
 * 
 * @description 
 * 예) CME1003={0} : a, b : [{1}], $^%&*# : {2} 와 같은 메세지가 있을 경우
 * message('CME1003', ['abc', 'def', 'ghi']); 와 같은 형태로 사용하면 됩니다.
 * 
 * @author tirico
 */
const getMessageWithFormatConvertLocale = function(key, param, locale) {
    if(key === null || key === undefined) {
        throw new Error(message['CME0002']); // CME0002=Message Key is Empty
    }

    const msg_src = message[key];

    if(msg_src === null || msg_src === undefined) {
        throw new Error(message['CME0001'] + ':' + key); // CME0001=Undefined Message
    }

    const mf = new message_format(locale);
    const msg = mf.compile(msg_src);

    let json;
    if(param instanceof Array) {
        json = JSON.stringify(param);
    } else {
        throw new Error(message['CME2001']); // CME2001= Invalid Type argument
    }

    return msg(JSON.parse(json));
}

/**
 * 사용자 정의 메세지를 가져오는 함수.
 * @param {String} key @description [필수] message.properties 파일에 정의된 에러 코드의 Key를 넣으십시오.
 * @param {Array} param @description [선택] 메세지에 포맷대로 인자를 넣고 싶다면 이 값을 넣으십시오.
 * @param {String} locale @description [선택] 만약 언어와 인코딩을 선택하고 싶을 때, 이 값을 넣으십시오.
 *
 * @description arguments 객체를 이용하여 overloading 처럼 구현 하였습니다.
 *
 * @author tirico
 */
module.exports = function() {
    const length = arguments.length;

    switch(length) {
        case 1:
            return getMessage(arguments[0]);
        case 2:
            return getMessageWithFormat(arguments[0], arguments[1]);
        case 3:
            return getMessageWithFormatConvertLocale(arguments[0], arguments[1], arguments[2]);
        default:
            throw new Error(message['CME0003']); // CME0003=Undefined Function
    }
}
