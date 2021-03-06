crypto = require 'crypto'
fs     = require 'fs'

global.AnonyPages.app.post '/page/:pageID/post', (req, res) ->
    i18n = global.AnonyPages.i18n

    if !req.body["g-recaptcha-response"]? or !req.body.message? or !req.body.o or typeof global.AnonyPages.config.pages[req.params.pageID] == "undefined"
        console.log "Post result: code 1"
        res.status(400).json
            code: 1
            err: 1
            message: i18n.bad_request
        throw new Error "abort"

    config       = global.AnonyPages.config
    pageID       = req.params.pageID
    pageConfig   = config.pages[pageID]
    accessToken  = pageConfig.access_token
    facebookObj  = new global.AnonyPages.facebook()
    pageFeed     = null
    nextHashtag  = ""
    hash         = null

    if req.body.o == "unauthorized"
        console.log "Post result: code 10"
        res.status(400).json
            code: 10
            err: 1
            message: i18n.login_to_facebook
        throw new Error "abort"

    global.AnonyPages.recaptcha.verify req.body["g-recaptcha-response"]
    .then ->
        return facebookObj.verifyUserAccessToken req.body.o
    .then (userInfo) ->
        hash = crypto.createHash('md5').update(userInfo.id).digest('hex')

        try
            data = fs.readFileSync __dirname + "/../blacklist.list", "utf8"

            if data && data.toString().trim().split("\n").indexOf(hash) != -1
                console.log "Post result: code 12"
                res.status(400).json
                    code: 12
                    err: 1
                    message: i18n.blocked_id
                throw new Error "abort"
        catch err
            if err.code != "ENOENT"
                console.log err
                console.log "Post result: code 11"
                res.status(500).json
                    code: 11
                    err: 1
                    message: i18n.internal_server_error
                throw new Error "abort"

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
                console.log e
                console.log "Post result: code 2"
                res.status(500).json
                    code: 2
                    err: 1
                    message: i18n.internal_server_error
                throw new Error "abort"

        today     = new Date()
        yyyy      = today.getFullYear()
        mm        = if today.getMonth() < 10 then '0' + (today.getMonth() + 1).toString() else (today.getMonth() + 1).toString()
        dd        = if today.getDate() < 10 then '0' + today.getDate().toString() else today.getDate().toString()
        h         = if today.getHours() < 10 then '0' + today.getHours().toString() else today.getHours().toString()
        m         = if today.getMinutes() < 10 then '0' + today.getMinutes().toString() else today.getMinutes().toString()
        s         = if today.getSeconds() < 10 then '0' + today.getSeconds().toString() else today.getSeconds().toString()

        time      = "#{yyyy}-#{mm}-#{dd} #{h}:#{m}:#{s}"

        afterPost = pageConfig.afterPost

        message   = nextHashtag + "\n"
        message  += req.body.message.trim() + "\n\n"
        message  += i18n.time_submitted + time + "\n"
        message  += afterPost + "\n"
        message  += i18n.post_hash + hash

        return facebookObj.postArticleToPage pageID, accessToken, message
    .then (postData) ->
        postID = postData["id"].toString().split("_")[1]

        console.log "Post result: code 0 (#{nextHashtag})"
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
        if err.message == "abort"
            return

        switch err
            when "recaptcha!"
                console.log "Post result: code 3"
                res.status(500).json
                    code: 3
                    err: 1
                    message: i18n.internal_server_error
                return
            when "recaptcha"
                console.log "Post result: code 4"
                console.log "reCAPTCHA response: #{req.body["g-recaptcha-response"]}"
                res.status(400).json
                    code: 4
                    err: 1
                    message: i18n.please_complete_the_captcha_correctly
                return
            when "verify!"
                console.log "Post result: code 5"
                res.status(500).json
                    code: 5
                    err: 1
                    message: i18n.internal_server_error
                return
            when "verify"
                console.log "Post result: code 6"
                res.status(400).json
                    code: 6
                    err: 1
                    message: i18n.bad_request
                return
            when "getFeed"
                console.log "Post result: code 7"
                res.status(500).json
                    code: 7
                    err: 1
                    message: i18n.internal_server_error
                return
            when "post"
                console.log "Post result: code 8"
                res.status(500).json
                    code: 8
                    err: 1
                    message: i18n.internal_server_error
                return
            else console.log "Uncaught error: #{err}"
