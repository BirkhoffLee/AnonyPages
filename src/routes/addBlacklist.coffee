fs = require "fs"

global.AnonyPages.app.get '/addBlacklist/:key/:identifier', (req, res) ->
    config = global.AnonyPages.config
    i18n   = global.AnonyPages.i18n
    path   = "../blacklist.list"

    if !req.params.key? or !req.params.identifier or req.params.key != config.adminKey
        false

    # Create blacklist.list if not exists
    fs.closeSync fs.openSync path, 'w'
    
    fs.readFile path, encoding: 'utf8', (error, data) ->
        if error
            console.log error
            res.status(500).json
                code: 2
                err: 1
                message: i18n.internal_server_error
            false

        if data.toString().indexOf(req.params.identifier) != -1
            res.status(200).json
                code: 1
                err: 0
                message: i18n.identifier_already_added
            true
        else
            fs.appendFile path, "\n" + req.params.identifier, (err) ->
                if err
                    console.log err
                    res.status(500).json
                        code: 3
                        err: 1
                        message: i18n.internal_server_error
                    false
                res.status(200).json
                    code: 0
                    err: 0
                    message: i18n.done_add_blacklist
