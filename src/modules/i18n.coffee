module.exports = ->
    global.AnonyPages.language = if global.AnonyPages.config.lang? then global.AnonyPages.config.lang else "en-US"

    langPath = "#{__dirname}/../locale/#{global.AnonyPages.language}.json"

    try
        result = require langPath
    catch e
        new Error "Could not load the locale file which should located at #{langPath} according to the configuration file"
        false

    result
