const mybatisMapper = require('mybatis-mapper');
const mybatis_config = require('../../system/properties_manager').mybatis_config;

// mybatis 포맷 설정
const format = {
    language : 'sql',
    indent : ' '
};

const mapper_path = mybatis_config['SQL_PATH'];

// mybatis Mapper 생성
const createMapper = function() {
    const namespace_property = mybatis_config['NAMESPACE_ARRAY'];
    let namespace_arr = namespace_property.split(',');
    namespace_arr.forEach((item, index, array) => {
        namespace_arr[index] = mapper_path + item;
    });
    mybatisMapper.createMapper(namespace_arr);
}

const getStatement = function(namespace, query_name, param) {
    return mybatisMapper.getStatement(namespace, query_name, param, format);
}

module.exports = {
    createMapper : createMapper,
    getStatement : getStatement
};
