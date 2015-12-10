module.exports = function () {
    var FacebookPage        = require(core.paths.module + "/facebook.js");
    var FacebookPageObjects = {};
    var wsPort              = config.server.socketio.port;

    for (var pageID in config.pages) {
        FacebookPageObjects[pageID] = new FacebookPage(pageID, config.pages[pageID].access_token);
    }


    core.socketio = require('socket.io')(wsPort);
    console.log(core.il8n.socketio_serv_running_on + 'ws://' + config.server.host.toString() + ":" + wsPort.toString());

    core.socketio.on('connection', function (socket) {
        socket.emit('connected');
        socket.on('getLatestPostIDs', function (data) {
            // console.log(core.il8n.recvd_getLatestPostIDs);

            var latestIDList = {};

            function checkIfDone () {
                if (Object.keys(latestIDList).length == Object.keys(FacebookPageObjects).length) {
                    socket.emit('getLatestPostIDsResult', {
                        code: 0,
                        err: false,
                        list: latestIDList
                    });
                } else {
                    setTimeout(checkIfDone, 100);
                }
            }

            for (var thisPageID in FacebookPageObjects) {
                FacebookPageObjects[thisPageID].getFeed(function (result, resPageID) {
                    if (result === false) {
                        socket.emit('getLatestPostIDsResult', {
                            code: 1,
                            err: true,
                            msg: core.il8n.notification_fb_getfeed_failed.replace("{pageID}", resPageID)
                        });

                        return false;
                    }

                    if (typeof result.error != "undefined") {
                        var errMsg  = "--" + "\n";
                            errMsg += "[" + result.error.type + "] ";
                            errMsg += result.error.message + "\n";
                            errMsg += core.il8n.err_check_this + config.facebook.graphAPIerrorRef + "\n";
                            errMsg += "--";

                        console.error(errMsg);

                        socket.emit('getLatestPostIDsResult', {
                            code: 2,
                            err: true,
                            msg: core.il8n.notification_fb_getfeed_failed.replace("{pageID}", resPageID)
                        });

                        return false;
                    }

                    if (typeof result.data == "undefined") {
                        socket.emit('getLatestPostIDsResult', {
                            code: 3,
                            err: true,
                            msg: core.il8n.notification_fb_getfeed_failed.replace("{pageID}", resPageID)
                        });

                        return false;
                    }

                    var BreakException = {};
                    var latestID;
                    try {
                        var hasAnonyPost = false;

                        result.data.forEach(function (post) {
                            if (post.message.startsWith(config.pages[resPageID].hashtag)) {
                                latestID = parseInt(post.message.split("\n")[0].trim().slice(config.pages[resPageID].hashtag.length));
                                latestIDList[resPageID] = latestID;
                                hasAnonyPost = true;

                                throw BreakException;
                            }
                        });

                        if (!hasAnonyPost) {
                            latestIDList[resPageID] = 0;
                        }
                    } catch (e) {
                        if (e !== BreakException) {
                            console.error(e);

                            socket.emit('getLatestPostIDsResult', {
                                code: 4,
                                err: true,
                                msg: core.il8n.notification_fb_parseid_failed.replace("{pageID}", resPageID)
                            });

                            return false;
                        }
                    }
                });
            }

            setTimeout(checkIfDone, 100);
        });
    });
}
