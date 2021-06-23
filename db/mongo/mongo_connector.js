const mongoose = require('mongoose');

const mongo_config = require('../../system/properties_manager').mongo_config;

mongoose.Promise = global.Promise;

module.exports = function() {
    return mongoose.connect(mongo_config['MONGO_URI']);
}
