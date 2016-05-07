crypto = require "crypto"

global.AnonyPages.app.get '/addBlacklist/:key/:identifier', (req, res) ->
    config = global.AnonyPages.config

    if !req.params.key? or !req.params.identifier or req.params.key != config.adminKey
        false

    fs.writeFile __dirname + "/../blacklist.list", "\n#{identifier}", (err) ->
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