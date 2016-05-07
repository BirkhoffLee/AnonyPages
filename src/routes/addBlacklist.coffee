fs = require "fs"

global.AnonyPages.app.get '/addBlacklist/:key/:identifier', (req, res) ->
    config = global.AnonyPages.config
    i18n   = global.AnonyPages.i18n

    if !req.params.key? or !req.params.identifier or req.params.key != config.adminKey
        false

    fs.appendFile __dirname + "/../blacklist.list", "\n" + req.params.identifier, (err) ->
        if err
            console.log err
            res.status(500).json
                code: 1
                err: 1
                message: i18n.internal_server_error
        res.status(200).json
            code: 0
            err: 0
            message: i18n.done_add_blacklist