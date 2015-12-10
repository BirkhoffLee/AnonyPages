core.server.get('/notification', function (req, res) {
    if (!config.notification.enabled) { return true; }

    var pageNames = "";
    for (var key in config.pages) {
        pageNames += key + ": '" + config.pages[key].pageName + "', ";
    }

    var array = {
        il8n: core.il8n,
        socketIOport: ":" + config.server.socketio.port.toString(),
        update_timeout: config.notification.update_timeout.toString(),
        fb_app_id: config.facebook.app_id,
        page_names: "{" + pageNames.slice(0, pageNames.length - 2) + "}"
    };

    res.render("notification/index", array);
    return true;
});
