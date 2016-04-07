###
# AnonyPages
# -- a node.js package for people to post
# articles to Facebook Pages anonymously.
#
# @author Birkhoff Lee
# @license MIT
###

global.AnonyPages           = {}
global.AnonyPages.config    = require "./src/config"
global.AnonyPages.i18n      = (require "./src/modules/i18n")()
global.AnonyPages.functions = require "./src/modules/functions"
global.AnonyPages.facebook  = require "./src/modules/facebook"
global.AnonyPages.recaptcha = require "./src/modules/recaptcha"

(require "./src/modules/httpServer")()
