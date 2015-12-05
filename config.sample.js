// # AnonyPages Configuration

var path = require('path'),
    config;

config = {
    version: "v0.0.1",

    pages: {

        /*
            The page ID of the page.
         */
        page_id: {
            siteName: "",
            pageName: "",
            hashtag: "",
            pageUrl: "",

            /**
             * afterPost is deprecated.
             * Edit this on the Admin page.
             */
            // afterPost: ""

            /**
             * PostLabel, PostPlaceholder and terms are deprecated.
             * Edit them in its own view page.
             */
            // postLabel: "",
            // postPlaceholder: "",
            // terms: "",

            /**
             * access_token is deprecated.
             * We will store this in the database.
             */
            // access_token: ""
        }
    },

    facebookApp: {
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
        app_secret: ""
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
        gRsecret: ""
    },

    /*
        Web Server settings
     */
    server: {
        host: '127.0.0.1',
        port: '1020'
    }
};

module.exports = config;
