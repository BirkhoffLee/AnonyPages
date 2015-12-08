module.exports = function (path) {
    /**
     * Set the paths of some dirs
     * @type {Object}
     */
    core.paths = {
        root:        path,
        core:        path + "/core",
        web:         path + "/web",
        lang:        path + "/lang",
        route:       path + "/web/route",
        server:      path + "/core/server",
        module:      path + "/core/module",
        middleware:  path + "/core/middleware"
    };

    /*
        Load configuration
     */
    config = require(core.paths.root + "/config.js");

    /*
        il8n
     */
    core.il8n = require(core.paths.module + "/il8n.js").register();

    /*
        Start Web Server
     */
    core.server    = require(core.paths.server + "/server.js");
    core.express   = core.server.express;
    core.webServer = core.server.webServer;
    core.server    = core.server.app;

    /*
        Request logger
     */
    core.weblogger = require('morgan');
    core.server.use(core.weblogger(':remote-addr - ":user-agent" - ":method :url HTTP/:http-version" :status - :response-time ms'));

    /*
        Load modules
     */
    require('require-directory')(module, core.paths.module);

    /*
        Load the routes and middlewares of express
     */
    require('require-directory')(module, core.paths.middleware);
    require('require-directory')(module, core.paths.route);

    require(core.paths.core + "/404_handler.js");
};
