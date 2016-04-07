###
# HTTP server initialization
# @author Birkhoff Lee
###

module.exports = ->
    express     = require 'express'
    swig        = require 'swig'
    bodyParser  = require 'body-parser'
    weblogger   = require 'morgan' if global.AnonyPages.enableWebLogger

    app         = global.AnonyPages.app = express()
    port        = global.AnonyPages.config.server.port

    ###
    # Render settings
    ###
    app.engine 'html', swig.renderFile
    app.use express.static "#{__dirname}/../public"
    app.set 'views', "#{__dirname}/../views"
    app.set 'view engine', 'html'

    ###
    # To make sure we got the correct
    # visitors' IP address
    ###
    app.set 'trust proxy', 1

    ###
    # Remove x-powered-by header
    ###
    app.disable 'x-powered-by'

    ###
    # Request information logger
    ###
    app.use weblogger ':remote-addr - ":user-agent" - ":method :url HTTP/:http-version" :status - :response-time ms' if global.AnonyPages.enableWebLogger

    ###
    # Initalize form data parser
    ###
    app.use bodyParser.urlencoded {extended: false}
    app.use bodyParser.json()

    ###
    # Routers
    ###
    (require "require-directory") module, "#{__dirname}/../routes/"

    ###
    # Start listening
    ###
    app.listen port, ->
        console.log "AnonyPages web server listening on port #{port}" if global.AnonyPages.enableWebLogger

    ###
    # Last route: 404 Not Found
    ###
    app.use (req, res, next) ->
        global.AnonyPages.functions.notFound req, res
