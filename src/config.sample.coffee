module.exports =
    lang: "en-US"
    pages:
        PAGE_ID_HERE:
            pageName: "PAGE_NAME"
            hashtag: "#HASHTAG"
            pageUrl: "https://www.facebook.com/PAGEbalabala/"

            # Do a test, and you will know where these
            # things are.
            afterPost: "Thanks for choosing AnonyPages"
            postLabel: "Lorem ipsum dolor sit amet"
            postPlaceholder: "consectetur adipiscing elit"

            # \n for new lines
            terms: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

            # Follow this tutorial: http://stackoverflow.com/questions/12168452/long-lasting-fb-access-token-for-server-to-pull-fb-page-info/21927690#21927690
            access_token: ""
    # Encrypting key
    encryptKey: "CHANGE ME WITH RAMDOM VALUE"
    server:
        # Web server port
        port: 1826
    googleRecaptcha:
        siteKey: "SITE_KEY"
        siteSecret: "SITE_SECRET"

        # Don't touch
        verifyURL: "https://www.google.com/recaptcha/api/siteverify"
    facebook:
        app_id: "APP_ID"
        app_secret: "APP_SECRET"

        # Don't touch
        postURL: "https://www.facebook.com/{page_id}/posts/{postID}"
        hashtagURL: "https://www.facebook.com/hashtag/{hashtag}?story_id={postID}"
        getFeedURL: "https://graph.facebook.com/{pageID}/posts?access_token={accessToken}"
        postArticleURL: "https://graph.facebook.com/v2.5/{pageID}/feed"
        verifyUserAccessTokenURL: "https://graph.facebook.com/me/?access_token={accessToken}"