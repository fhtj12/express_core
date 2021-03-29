/**
 * JSON 형태의 Object 를 Map 으로 바꿔주는 함수.
 * @param {Object} object @description JSON 형태의 Object
 * 
 * @author tirico
 */
var objToMap = function(object) {
    let map = new Map();
    for(let k of Object.keys(object)) {
        map.set(k, object[k]);
    }
    return map;
}

module.exports = {
    objToMap : objToMap
}