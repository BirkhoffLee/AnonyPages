module.exports = function (path) {
    /**
     * Set the paths of some dirs
     * @type {Object}
     */
    core.paths = {
        root:        path,
        core:        path + "/core",
        web:         path + "/web",
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
    core.server.use(core.weblogger('":method :url HTTP/:http-version" :status - :remote-addr - :response-time ms - ":user-agent"'));

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
