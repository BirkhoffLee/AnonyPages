var request = require("request");

// I use this because I'm behind GFW, you don't need this
// var agent = new require('pac-proxy-agent')('pac+http://127.0.0.1:16823/proxy_on.pac');

function FacebookPage (pageID, accessToken) {
    if (typeof pageID == "undefined") {
        console.log(core.il8n.err_FacebookPage_pageID_not_given);
        process.exit(-1);
    }
    if (typeof accessToken == "undefined") {
        console.log(core.il8n.err_FacebookPage_accessToken_not_given);
        process.exit(-1);
    }

    this.pageID      = pageID;
    this.accessToken = accessToken;

    this.getFeedURL     = config.facebook.getFeedURL;
    this.postArticleURL = config.facebook.postArticleURL;
}

FacebookPage.prototype.getFeed = function (callback) {
    var self = this;

    var url = self.getFeedURL.replace("{pageID}", self.pageID);
        url = url.replace("{accessToken}", self.accessToken);

    request({
        url      : url,
        encoding : null,
        gzip     : true,
        // agent    : agent,
        followRedirect: true
    }, function (error, response, body) {
        if (error) {
            console.error(core.il8n.err_get_feed_failed + self.pageID.toString());
            console.error(error);
            callback(false);
        }

        try {
            callback(JSON.parse(body), self.pageID);
        } catch (e) {
            console.error(core.il8n.err_get_feed_failed + self.pageID.toString());
            console.error(e);
            callback(false);
        }
    });
}

FacebookPage.prototype.postArticle = function (message, callback) {
    var self = this;

    var url = self.postArticleURL.replace("{pageID}", self.pageID);

    request.post({
        url      : url,
        encoding : null,
        gzip     : true,
        // agent    : agent,
        form     : {
            access_token: self.accessToken,
            message: message
        },
        followRedirect: true
    }, function(error, response, body) {
        if (error) {
            console.error(core.il8n.err_post_article_failed + self.pageID.toString());
            console.error(error);
            callback(false);
        }

        callback(JSON.parse(body));
    });
}

module.exports = FacebookPage;
