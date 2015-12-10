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

    /**
     * Load the configuration
     * @type {object}
     */
    config = require(core.paths.root + "/config.js");

    // /**
    //  * Load the database
    //  * @type {nedb}
    //  */
    // var nedb        = require("nedb");
    // core.Datastore  = require("nedb");
    // core.db         = {};
    // core.db.main    = new core.Datastore({ filename: 'anonypages.db' });
    // core.db.main.loadDatabase(function (err) {
    //     /**
    //      * Check error status
    //      * @param  {[type]} err Error Information
    //      * @return {void}
    //      */
    //     if (err) {
    //         console.error("Failed loading the database!");
    //         console.error(err);
    //         process.exit(-1);
    //     }

        /**
         * Register il8n helper
         * @type {object}
         */
        core.il8n = require(core.paths.module + "/il8n.js").register();

        /**
         * Start web server
         * @type {object}
         */
        core.server    = require(core.paths.server + "/server.js");
        core.socketio  = require(core.paths.server + "/socketio.js")();
        core.express   = core.server.express;
        core.webServer = core.server.webServer;
        core.server    = core.server.app;

        /**
         * Register request logger
         * @type {object}
         */
        core.weblogger = require('morgan');
        core.server.use(core.weblogger(':remote-addr - ":user-agent" - ":method :url HTTP/:http-version" :status - :response-time ms'));

        /**
         * Load the modules
         */
        require('require-directory')(module, core.paths.module);

        /**
         * Load the routes and middlewares of express
         */
        require('require-directory')(module, core.paths.middleware);
        require('require-directory')(module, core.paths.route);

        /**
         * Register 404 error handler
         * This must be the last middleware loaded
         */
        require(core.paths.core + "/404_handler.js");
    // });
};
