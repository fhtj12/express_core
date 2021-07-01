const propertiesReader = require('properties-reader');

/**
 * <NODE_ENV 설정 방법>
 * 1. npm start 로 실행할 경우
 * (Windows cmd) set NODE_ENV=development
 * (linux) export NODE_ENV=production
 * 2. 로컬에서 디버깅 실행할 경우
 * (vscode) launch.json 파일의 program 항목 다음에 env 속성 추가 후 {} 안에 "NODE_ENV" : "development" 추가.
 */

// server
const server_config = propertiesReader.builder('./properties/server_config.properties').getAllProperties();

// message
const message = propertiesReader.builder('./properties/message.properties').getAllProperties();

// mybatis
const mybatis_config = propertiesReader.builder('./properties/mybatis.properties').getAllProperties();

// mysql
const mysql_config = propertiesReader.builder('./properties/' + process.env.NODE_ENV + '/mysql_config.properties').getAllProperties();

// mongo
const mongo_config = propertiesReader.builder('./properties/' + process.env.NODE_ENV + '/mongo_config.properties').getAllProperties();

// redis
const redis_config = propertiesReader.builder('./properties/' + process.env.NODE_ENV + '/redis_config.properties').getAllProperties();

module.exports = {
    server_config : server_config,
    message : message,
    mybatis_config : mybatis_config,
    mysql_config : mysql_config,
    mongo_config : mongo_config,
    redis_config : redis_config
}
