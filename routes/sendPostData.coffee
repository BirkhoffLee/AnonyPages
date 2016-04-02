crypto = require 'crypto'

global.AnonyPages.app.post '/page/:pageID/post', (req, res) ->
    i18n = global.AnonyPages.i18n

    if !req.body["g-recaptcha-response"]? or !req.body.message? or !req.body.o or typeof global.AnonyPages.config.pages[req.params.pageID] == "undefined"
        res.status(400).json
            code: 1
            err: 0
            message: i18n.bad_request
        false

    config       = global.AnonyPages.config
    pageID       = req.params.pageID
    pageConfig   = config.pages[pageID]
    accessToken  = pageConfig.access_token
    facebookObj  = new global.AnonyPages.facebook()
    userInfo     = null
    userURL      = null
    pageFeed     = null
    nextHashtag  = ""

    if req.body.o == "unauthorized"
        res.status(400).json
            code: 10
            err: 1
            message: i18n.login_to_facebook
        false

    global.AnonyPages.recaptcha.verify req.body["g-recaptcha-response"]
    .then ->
        return facebookObj.verifyUserAccessToken req.body.o
    .then (information) ->
        userInfo = information
        userURL  = "https://www.facebook.com/app_scoped_user_id/#{userInfo.id}"
        return facebookObj.getPageFeed pageID, accessToken
    .then (pageFeed) ->
        breakException = {}

        try
            doneFinding = false

            pageFeed.data.forEach (post) ->
                message = post.message.toString()

                if !message? then return

                if message.toString().indexOf(pageConfig.hashtag) == 0
                    latestCount = parseInt message.toString().split("\n")[0].trim().slice pageConfig.hashtag.length
                    nextHashtag = pageConfig.hashtag + (latestCount + 1).toString()
                    doneFinding = true
                    throw breakException

            if !doneFinding
                nextHashtag = pageConfig.hashtag + "1"
        catch e
            if e != breakException
                res.status(500).json
                    code: 2
                    err: 1
                    message: i18n.internal_serer_error
                false

        today     = new Date()
        yyyy      = today.getFullYear()
        mm        = if today.getMonth() < 10 then '0' + (today.getMonth() + 1).toString() else (today.getMonth() + 1).toString()
        dd        = if today.getDate() < 10 then '0' + today.getDate().toString() else today.getDate().toString()
        h         = if today.getHours() < 10 then '0' + today.getHours().toString() else today.getHours().toString()
        m         = if today.getMinutes() < 10 then '0' + today.getMinutes().toString() else today.getMinutes().toString()
        s         = if today.getSeconds() < 10 then '0' + today.getSeconds().toString() else today.getSeconds().toString()

        time      = "#{yyyy}-#{mm}-#{dd} #{h}:#{m}:#{s}"

        afterPost = pageConfig.afterPost

        cipher    = crypto.createCipher 'aes-256-cbc', config.encryptKey.toString 'binary'
        crypted   = cipher.update userURL, 'utf8', 'hex'
        crypted  += cipher.final 'hex'

        message   = nextHashtag + "\n"
        message  += req.body.message + "\n\n"
        message  += i18n.time_submitted + time + "\n"
        message  += afterPost + "\n"
        message  += i18n.post_identifier + crypted

        return facebookObj.postArticleToPage pageID, accessToken, message
    .then (postData) ->
        postID = postData["id"].toString().split("_")[1]

        res.status(200).json
            code: 0
            err: 0
            message: i18n.posting_succeed
            result:
                postURL: config.facebook.postURL.replace("{page_id}", pageID).replace("{postID}", postID)
                hashtagURL: config.facebook.hashtagURL.replace("{hashtag}", nextHashtag.replace("#", "")).replace("{postID}", postID)
                hashtag: nextHashtag
                postid: postID
    .fail (err) ->
        switch err
            when "recaptcha!"
                res.status(500).json
                    code: 3
                    err: 1
                    message: i18n.internal_serer_error
                false
            when "recaptcha"
                res.status(400).json
                    code: 4
                    err: 1
                    message: i18n.please_complete_the_captcha_correctly
                false
            when "verify!"
                res.status(500).json
                    code: 5
                    err: 1
                    message: i18n.internal_serer_error
                false
            when "verify"
                res.status(400).json
                    code: 6
                    err: 1
                    message: i18n.bad_request
                false
            when "getFeed"
                res.status(500).json
                    code: 7
                    err: 1
                    message: i18n.internal_serer_error
                false
            when "post"
                res.status(500).json
                    code: 8
                    err: 1
                    message: i18n.internal_serer_error
                false

        console.log err