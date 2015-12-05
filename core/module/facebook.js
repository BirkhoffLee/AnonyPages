var request = require("request");

function FacebookPage (pageID, accessToken) {
    this.pageID = pageID;
    this.pageID = accessToken;

    this.getFeedURL     = "https://graph.facebook.com/{pageID}/posts?access_token={accessToken}";
    this.postArticleURL = "https://graph.facebook.com/v2.5/{pageID}/feed";
}

FacebookPage.prototype.getFeed = function (callback) {
    var self = this;

    var url = self.getFeedURL.replace("{pageID}", self.pageID);
        url = url.replace("{accessToken}", self.accessToken);

    request({
        url      : url,
        encoding : null,
        gzip     : true,
        followRedirect: true
    }, function(error, response, body) {
        if (error) {
            console.error("Could not get the feed of page " + self.pageID.toString() + ":");
            console.error(error);
            callback(false);
        }

        callback(JSON.parse(body));
    });
}

FacebookPage.prototype.postArticle = function (message, callback) {
    var self = this;

    var url = self.postArticleURL.replace("{pageID}", self.pageID);

    request.post({
        url      : url,
        encoding : null,
        gzip     : true,
        form     : {
            access_token: self.accessToken,
            message: message
        },
        followRedirect: true
    }, function(error, response, body) {
        if (error) {
            console.error("Could not post the article to page " + self.pageID.toString() + ":");
            console.error(error);
            callback(false);
        }

        callback(JSON.parse(body));
    });
}

module.exports = FacebookPage;
