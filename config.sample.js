// # AnonyPages Configuration

var path = require('path'),
    config;

config = {
    version: "v0.0.1",

    pages: {

        /*
            The page ID of the page.
         */
        {PAGE_ID_HERE}: {
            siteName: "靠北 XXX",
            pageName: "靠北XXX",
            hashtag: "#靠北XXX",
            pageUrl: "https://www.facebook.com/XXXXX",

            /**
             * afterPost is deprecated.
             * Edit this on the Admin page.
             */
            afterPost: "",

            /**
             * PostLabel, PostPlaceholder and terms are deprecated.
             * Edit them in its own view page.
             */
            postLabel: "",
            postPlaceholder: "",
            terms: "",

            /**
             * access_token is deprecated.
             * We will store this in the database.
             */
            access_token: ""
        }
    },

    facebook: {
        /*
            Attention: The app MUST be general public or
            other visitors can't see the posts. Fill the
            contact mail field in the Settings page of
            your facebook app. And go to Status & Review
            to make the app general public.
         */

        /*
            Facebook App ID.
         */
        app_id: "",

        /*
            Facebook App Secret.
            Do not make this known by untrusted people.
         */
        app_secret: "",

        /*
            The Graph API URL to get feed
         */
        getFeedURL: "https://graph.facebook.com/{pageID}/posts?access_token={accessToken}",

        /*
            The Graph API URL to get feed
         */
        postArticleURL: "https://graph.facebook.com/v2.5/{pageID}/feed",

        /*
            The Graph API Doc URL of error explanations
         */
        graphAPIerrorRef: "https://developers.facebook.com/docs/graph-api/using-graph-api/v2.5#errors",

        /*
            The Facebook URL of the post
         */
        postURL: "https://www.facebook.com/{page_id}/posts/{postID}",

        /*
            The Facebook URL of the hashtag (including the post's id)
         */
        hashtagURL: "https://www.facebook.com/hashtag/{hashtag}?story_id={postID}"
    },

    googleRecaptcha: {
        /*
            Enable Google Recaptcha or not.
            It's highly recommended to enable
            this, it's a free service!
         */
        enabled: true,

        /*
            Google Recaptcha Site Key for this site.
         */
        gRsitekey: "",

        /*
            Google Recaptcha Secret Key for this site.
            Do not make this known by untrusted people.
         */
        gRsecret: "",

        /*
            The URL to verify g-recaptcha-response
         */
        verifyURL: "https://www.google.com/recaptcha/api/siteverify"
    },

    /*
        Web Server settings
     */
    server: {
        host: '127.0.0.1',
        port: '1020'
    },

    lang: "en-US"
};

module.exports = config;
