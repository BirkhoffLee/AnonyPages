var request = require("request");
AnonyPages = {};

AnonyPages.formParams = function (req, res) {
    if (!req.params.pageid || !config.pages[req.params.pageid]) {
        res.redirect('/error/page');
        return false;
    }

    var pageID  = req.params.pageid;
    var configs = config.pages[pageID];

    var array  = {
        siteName: configs.siteName,
        pageName: configs.pageName,
        // postLabel: configs.,
        // postPlaceholder: configs.,
        // Terms: configs.,
        postLabel: "你都在靠北些什麼？",
        pageID: pageID,
        postPlaceholder: "請勿包含違法內容及能夠辨識被靠北人身份的字眼。我們將會記錄您的 IP 位置及您的行為，請勿提交無關 LOL 英雄聯盟遊戲 之貼文。如您不當地使用此網頁，必要時，我們有權利直接封鎖您的 IP 位置及使用者唯一辨識碼以阻止您使用此服務且我們將不會進行解鎖。感謝您的配合。",
        Terms: "123",
        gRsitekey: config.googleRecaptcha.gRsitekey
    };

    res.render("post/postForm", array);
};

AnonyPages.postParams = function (req, res) {
    if (!req.params.pageid) {
        console.error("No pageID given!");

        res.redirect('/error/page');
        return false;
    }

    // Verify reCAPTCHA response
    request.post({
        url      : config.googleRecaptcha.verifyURL,
        encoding : null,
        gzip     : true,
        form     : {
            secret: config.googleRecaptcha.gRsecret,
            response: req.body["g-recaptcha-response"]
        },
        followRedirect: true
    }, function(error, response, body) {
        if (error) {
            console.error("Could not verify the g-recaptcha-response.");
            console.error(error);

            res.redirect('/error/500');
            return false;
        }

        if (JSON.parse(body).success != true) {
            res.redirect('/error/captcha');
            return false;
        }
    });
};
