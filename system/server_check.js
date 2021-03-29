var sqlConnector = require('../db/mysql/mysql_connector');
var mongoConnector = require('../db/mongo/mongo_connector');
var message = require('../system/message_manager');
var exception = require('../system/exception');

var mySqlCheck = async function() {
    await sqlConnector.select('Test', 'dbTest', null).then(function(result) {
        if(result[0]['TEST_RESULT'] === 1) {
            console.log(message('MDE0000')); // MDE0000=mysql connection established.
        } else {
            throw exception('MDE0001'); // MDE0001=mysql connection failed.
        }
    }).catch(function(error) { 
        throw exception(error);
    });
}

var mongoCheck = async function() {
    await mongoConnector().then(() => console.log(message('MGE0000')))
    .catch(function(error) {
        throw exception('MGE0001' + ':' + error);
    });
}

var redisCheck = async function() {
    await console.log('redis connector is not defined.');
}

var serverConditionCheck = async function(port) {
    console.log('Starting Environment : ' + process.env.NODE_ENV);
    mySqlCheck().then(() => {
        return redisCheck();
    }).then(() => {
        return mongoCheck();
    }).then(() => {
        console.log('Server start successfully on port : ' + port);
    })
}

module.exports = {
    serverConditionCheck : serverConditionCheck
}