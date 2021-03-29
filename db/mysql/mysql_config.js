const config = require('../../system/properties_manager').mysql_config;

module.exports = {
    host : config['HOST'],
    user : config['USER'],
    password : config['PASSWORD'],
    port : config['PORT'],
    database : config['DB'],
    connectionLimit : config['CONNECTION_LIMIT']
};