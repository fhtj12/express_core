/**
 * npm library & framework
 */
const express = require('express');
const app = express();

/**
 * init router
 */
const login_router = require('./router/login_router')(app);

/**
 * user library & framework
 */
const server_check = require('./system/server_check');

/**
 * configuration load
 */
const server_config = require('./system/properties_manager').server_config;

/**
 * init server
 */
const server = app.listen(server_config['PORT'], function() {
    server_check.serverConditionCheck(server_config['PORT'])
    .catch(function(error) {
        console.log(error);
    });
})

/**
 * basic error
 */
app.use((req, res, next) => {
    res.status(404).send();
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send();
})
