var pre_processor = require('../system/pre_processor');

module.exports = function(app) {
    /**
     * initial router
     */
    app.get('/', function(request, response) {
        pre_processor.process(request, ['a, b'], true).then(function(result) {
            response.send(200);
        }).catch(function(error) {
            response.send(error);
        });
    });
}