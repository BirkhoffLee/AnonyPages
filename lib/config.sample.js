// Generated by CoffeeScript 1.10.0
(function() {
  module.exports = {
    lang: "en-US",
    pages: {
      PAGE_ID_HERE: {
        pageName: "PAGE_NAME",
        hashtag: "#HASHTAG",
        pageUrl: "https://www.facebook.com/PAGEbalabala/",
        afterPost: "Thanks for choosing AnonyPages",
        postLabel: "Lorem ipsum dolor sit amet",
        postPlaceholder: "consectetur adipiscing elit",
        terms: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        access_token: ""
      }
    },
    encryptKey: "CHANGE ME WITH RAMDOM VALUE",
    server: {
      port: 1826
    },
    googleRecaptcha: {
      siteKey: "SITE_KEY",
      siteSecret: "SITE_SECRET",
      verifyURL: "https://www.google.com/recaptcha/api/siteverify"
    },
    facebook: {
      app_id: "APP_ID",
      app_secret: "APP_SECRET",
      postURL: "https://www.facebook.com/{page_id}/posts/{postID}",
      hashtagURL: "https://www.facebook.com/hashtag/{hashtag}?story_id={postID}",
      getFeedURL: "https://graph.facebook.com/{pageID}/posts?access_token={accessToken}",
      postArticleURL: "https://graph.facebook.com/v2.5/{pageID}/feed",
      verifyUserAccessTokenURL: "https://graph.facebook.com/me/?access_token={accessToken}"
    }
  };

}).call(this);