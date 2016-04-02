request = require "request"
Q       = require "q"
i18n    = global.AnonyPages.i18n

FacebookAPI = ->
    config = global.AnonyPages.config.facebook

    this.app_id                   = config.app_id
    this.app_secret               = config.app_secret
    this.getFeedURL               = config.getFeedURL
    this.postArticleURL           = config.postArticleURL
    this.verifyUserAccessTokenURL = config.verifyUserAccessTokenURL

FacebookAPI.prototype.verifyUserAccessToken = (accessToken) ->
    deferred    = Q.defer()
    self        = this
    url         = self.verifyUserAccessTokenURL.replace "{accessToken}", accessToken

    request
        url      : url
        encoding : null
        gzip     : true
        followRedirect: true
    , (error, response, body) ->
        if error
            deferred.reject "verify!"
            0

        try
            data = JSON.parse body
        catch e
            deferred.reject "verify!"
            0

        if data.error
            deferred.reject "verify"
            0

        deferred.resolve data

    deferred.promise

FacebookAPI.prototype.getPageFeed = (pageID, accessToken) ->
    deferred    = Q.defer()
    self        = this
    url         = self.getFeedURL.replace("{pageID}", pageID).replace "{accessToken}", accessToken

    request
        url      : url
        encoding : null
        gzip     : true
        followRedirect: true
    , (error, response, body) ->
        if error
            deferred.reject "getFeed"
            0

        try
            data = JSON.parse body
        catch e
            deferred.reject "getFeed"
            0

        if data.error or !data.data?
            deferred.reject "getFeed"
            0

        deferred.resolve data

    deferred.promise

FacebookAPI.prototype.postArticleToPage = (pageID, accessToken, message) ->
    deferred    = Q.defer()
    self        = this
    url         = self.postArticleURL.replace "{pageID}", pageID

    request.post
        url      : url
        encoding : null
        gzip     : true
        form     :
            access_token: accessToken
            message: message
        followRedirect: true
    , (error, response, body) ->
        if error
            deferred.reject "post"
            0

        try
            data = JSON.parse body
        catch e
            deferred.reject "post"
            0

        if data == false or !data.id?
            deferred.reject "post"
            0

        deferred.resolve data

    deferred.promise

module.exports = FacebookAPI
