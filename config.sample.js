// # AnonyPages Configuration

var path = require('path'),
    config;

config = {
    /**
     * Version
     * @type {String}
     */
    version: "v0.0.1",

    /**
     * Facebook pages configuration
     * Support multiple pages
     *
     * @type {Object}
     */
    pages: {

        /*
            The page ID of the page.
         */
        {PAGE_ID_HERE!}: {
            /**
             * The name of this page site
             * @type {String}
             */
            siteName: "靠北 XXX",

            /**
             * The name of the page
             * Must be the real page name
             * WILL BE DEPRECATED
             *
             * @type {String}
             */
            pageName: "靠北XXX",

            /**
             * The hashtag of each posts
             * If you change this, the hashtag
             * count will reset to 1
             *
             * @type {String}
             */
            hashtag: "#靠北XXX",

            /**
             * The facebook URL of the facebook page
             * @type {String}
             */
            pageUrl: "",

            /**
             * The text at the end of each posts
             * @type {String}
             */
            afterPost: "",

            /**
             * The label text above the post field
             * @type {String}
             */
            postLabel: "",

            /**
             * The placeholder of the post field
             * @type {String}
             */
            postPlaceholder: "",

            /**
             * Terms Of Service
             * Use "\n" for newline
             *
             * @type {String}
             */
            terms: "",

            /**
             * Page Access Token
             * @type {String}
             */
            access_token: "",

            /**
             * Rendering options
             * @type {Object}
             */
            option: {
                /**
                 * Auto resize the ToS textarea?
                 * Recommended value: false
                 *
                 * @type {Boolean}
                 */
                autoResizeTerms: false,

                /**
                 * The default "rows" value of the terms textarea
                 * @type {Number}
                 */
                TermsDefaultRows: 15
            }
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

        /**
         * Facebook App ID
         * @type {String}
         */
        app_id: "",

        /**
         * Facebook App Secret.
         * DO NOT make this known by anyone else.
         *
         * @type {String}
         */
        app_secret: "",

        /**
         * The Graph API URL to get feed
         * @type {String}
         */
        getFeedURL: "https://graph.facebook.com/{pageID}/posts?access_token={accessToken}",

        /**
         * The Graph API URL to post article
         * @type {String}
         */
        postArticleURL: "https://graph.facebook.com/v2.5/{pageID}/feed",

        /**
         * The Graph API Doc URL of error explanations
         * @type {String}
         */
        graphAPIerrorRef: "https://developers.facebook.com/docs/graph-api/using-graph-api/v2.5#errors",

        /**
         * The Facebook URL of the post
         * @type {String}
         */
        postURL: "https://www.facebook.com/{page_id}/posts/{postID}",

        /**
         * The Facebook URL of the hashtag (including the post's id)
         * @type {String}
         */
        hashtagURL: "https://www.facebook.com/hashtag/{hashtag}?story_id={postID}"
    },

    /**
     * Recaptcha is required
     * @type {Object}
     */
    googleRecaptcha: {
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
        /**
         * Host
         * @type {String}
         */
        host: '127.0.0.1',

        /**
         * Web Server settings
         * @type {Object}
         */
        web: {
            /**
             * Web Server port
             * @type {String}
             */
            port: '1020'
        },
        socketio: {
            /**
             * WS Server port
             * @type {String}
             */
            port: 2826
        }
    },

    /**
     * Notify you when a new article was posted.
     * Use this feature on /notification
     *
     * @type {Object}
     */
    notification: {
        /**
         * Enabled or not.
         * @type {Boolean}
         */
        enabled: true,

        /**
         * The delay between the checkings in milliseconds.
         * @type {Number}
         */
        update_timeout: 5000
    },

    /**
     * The lang we are using
     * Check the available languages in /lang
     *
     * @type {String}
     */
    lang: "en-US"
};

module.exports = config;
