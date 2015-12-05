/*
    Web Server
 */

var express = require('express'),
    app     = express(),
    swig    = require('swig');

/*
    Swig settings
 */
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', core.paths.web + '/views');
app.set('view cache', true);

/*
    Start server
 */
var webServer = app.listen(config.server.port);

/*
    Web server event hooks
 */
function webServOnErr (err) {
    if (err.errno === 'EADDRINUSE') {
        console.error('Could not start the web server (EADDRINUSE)');
        console.error('Port ' + config.server.port + ' is already in use by another program.');
        console.error('Is another AnonyPages instance already running?');
    } else {
        console.error('There was an error starting web server.');
        console.error('The errorNo is ' + err.errno);
    }

    process.exit(-1);
}

function webServOnListening () {
    console.log('Server is listening on ' + config.server.host.toString() + ":" + config.server.port.toString());
}

/*
    Bind hooks
 */
webServer.on('error'    , webServOnErr);
webServer.on('listening', webServOnListening);


/*
    Return objects
 */
module.exports = {app: app, express: express, webServer: webServer};
