###
# AnonyPages
# -- a node.js package for people to post
# articles to Facebook Pages∫ anonymously.
#
# @author Birkhoff Lee
# @license MIT
###

global.AnonyPages           = {}
global.AnonyPages.config    = require "./config"
global.AnonyPages.i18n      = (require "./modules/i18n")()
global.AnonyPages.functions = require "./modules/functions"
global.AnonyPages.facebook  = require "./modules/facebook"
global.AnonyPages.recaptcha = require "./modules/recaptcha"

(require "./modules/httpServer")()
