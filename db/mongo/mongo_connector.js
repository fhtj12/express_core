const mongoose = require('mongoose');

const mongo_config = require('../../system/properties_manager').mongo_config;

mongoose.Promise = global.Promise;

module.exports = function() {
    var connection = mongoose.connect(mongo_config['MONGO_URI']);

    return connection;
}