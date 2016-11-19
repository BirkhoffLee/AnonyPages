fs = require "fs"

global.AnonyPages.app.get '/addBlacklist/:key/:hash', (req, res) ->
    config = global.AnonyPages.config
    i18n   = global.AnonyPages.i18n
    path   = __dirname + "/../blacklist.list"

    if !req.params.key? or !req.params.hash or req.params.key != config.adminKey
        false

    # Create blacklist.list if not exists
    try
        fs.writeFileSync path, "" if !fs.statSync(path).isFile()
    catch e
        # ignore

    fs.readFile path, encoding: 'utf8', (error, data) ->
        if error
            console.log error
            res.status(500).json
                code: 2
                err: 1
                message: i18n.internal_server_error
            false

        if data.toString().indexOf(req.params.hash) != -1
            console.log data.toString()
            res.status(200).json
                code: 1
                err: 0
                message: i18n.hash_already_added
            true
        else
            fs.appendFile path, "\n" + req.params.hash, (err) ->
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
