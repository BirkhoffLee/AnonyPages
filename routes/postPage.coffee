global.AnonyPages.app.get '/page/:pageID', (req, res) ->
    if !req.params.pageID? or typeof global.AnonyPages.config.pages[req.params.pageID] == "undefined"
        false

    config     = global.AnonyPages.config
    pageID     = req.params.pageID
    pageConfig = config.pages[pageID]

    res.render "postForm",
        gRsitekey:          config.googleRecaptcha.siteKey
        postPlaceholder:    pageConfig.postPlaceholder
        i18n:               global.AnonyPages.i18n
        postLabel:          pageConfig.postLabel
        pageName:           pageConfig.pageName
        Terms:              pageConfig.terms
        pageID:             pageID
        fb_app_id:          config.facebook.app_id