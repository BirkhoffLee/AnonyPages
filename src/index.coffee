global.AnonyPages           = global.AnonyPages || {}
global.AnonyPages.config    = require "./config"
global.AnonyPages.i18n      = (require "./modules/i18n")()
global.AnonyPages.functions = require "./modules/functions"
global.AnonyPages.facebook  = require "./modules/facebook"
global.AnonyPages.recaptcha = require "./modules/recaptcha"

(require "./modules/httpServer")()
