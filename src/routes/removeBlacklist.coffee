fs = require "fs"

global.AnonyPages.app.get '/removeBlacklist/:key/:identifier', (req, res) ->
    config = global.AnonyPages.config
    i18n   = global.AnonyPages.i18n

    if !req.params.key? or !req.params.identifier or req.params.key != config.adminKey
        false

    fs.readFile __dirname + "/../blacklist.list", "utf8", (err, data) ->
        if err
            console.log err
            res.status(500).json
                code: 2
                err: 1
                message: i18n.internal_server_error
            false

        if data.toString().indexOf(req.params.identifier) != -1
            re = new RegExp req.params.identifier, "gi"
            writeData = data.replace(re, "").trim()

            fs.writeFile __dirname + "/../blacklist.list", writeData, (err) ->
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
                    message: i18n.done_remove_blacklist
        else
            res.status(200).json
                code: 1
                err: 0
                message: i18n.blacklist_not_exist