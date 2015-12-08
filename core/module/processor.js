var request      = require("request"),
    FacebookPage = require(core.paths.module + "/facebook.js");

// I use this because I'm behind GFW, you don't need this
// var agent = new require('pac-proxy-agent')('pac+http://127.0.0.1:16823/proxy_on.pac');

function sendResultJson (res, code, err, http_status_code, message_il8n_id, concatArr) {
    if (typeof concatArr != "object") {
        var result = {
            code: code,
            err: err,
            message: core.il8n[message_il8n_id]
        };
    } else {
        var result = {
            code: code,
            err: err,
            message: core.il8n[message_il8n_id],
            result: concatArr
        };
    }

    return res.status(http_status_code).json(result);
}

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
        postLabel: configs.postLabel,
        postPlaceholder: configs.postPlaceholder,
        Terms: configs.terms,
        pageID: pageID,
        gRsitekey: config.googleRecaptcha.gRsitekey,
        il8n: core.il8n
    };

    res.render("post/postForm", array);
};

AnonyPages.postParams = function (req, res) {
    var resultArr = {};
    if (!req.params.pageid) {
        console.error("No pageID given!");

        sendResultJson(res, 1, true, 400, "ui_err_missing_page_id");

        return false;
    }

    if (!req.body.message) {
        console.error("No message given!");

        sendResultJson(res, 2, true, 400, "ui_err_missing_message_field");

        return false;
    }

    if (!req.body["g-recaptcha-response"]) {
        console.error("No g-recaptcha-response given!");

        sendResultJson(res, 3, true, 400, "ui_err_recaptcha_invalid");

        return false;
    }

    // Verify reCAPTCHA response
    request.post({
        url      : config.googleRecaptcha.verifyURL,
        encoding : null,
        gzip     : true,
        // agent    : agent,
        form     : {
            secret: config.googleRecaptcha.gRsecret,
            response: req.body["g-recaptcha-response"]
        },
        followRedirect: true
    }, function(error, response, body) {
        if (error) {
            console.error(core.il8n.err_recaptcha_req_failed);
            console.error(error);

            sendResultJson(res, 4, true, 500, "ui_err_get_recaptcha_verification_failed");

            return false;
        }

        if (JSON.parse(body).success != true) {
            sendResultJson(res, 5, true, 400, "ui_err_recaptcha_invalid");

            return false;
        }

        var pageID      = req.params.pageid;
        var configs     = config.pages[pageID];
        var accessToken = configs.access_token;

        var facebookObj = new FacebookPage(pageID, accessToken);
        var newHashtag;

        facebookObj.getFeed(function (result) {
            if (result === false) {
                sendResultJson(res, 6, true, 500, "ui_err_fb_getfeed_failed");

                return false;
            }

            if (typeof result.error != "undefined") {
                var errMsg  = "--" + "\n";
                    errMsg += "[" + result.error.type + "] ";
                    errMsg += result.error.message + "\n";
                    errMsg += core.il8n.err_check_this + config.facebook.graphAPIerrorRef + "\n";
                    errMsg += "--";

                console.log(errMsg);

                sendResultJson(res, 7, true, 500, "ui_err_fb_getfeed_failed");
                return false;
            }

            if (typeof result.data == "undefined") {
                sendResultJson(res, 8, true, 500, "ui_err_fb_getfeed_failed");
                return false;
            }

            var BreakException = {};
            try {
                result.data.forEach(function (post) {
                    if (post.message.startsWith(configs.hashtag)) {
                        var nowNumber = parseInt(post.message.split("\n")[0].trim().slice(configs.hashtag.length));
                        var newID = nowNumber + 1;
                        newHashtag = configs.hashtag + newID.toString();

                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) {
                    console.error(e);
                    sendResultJson(res, 9, true, 500, "ui_err_article_process_failed");
                }
            }

            var today     = new Date();
            var yyyy      = today.getFullYear();
            var mm        = (today.getMonth() < 10) ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
            var dd        = (today.getDate() < 10) ? '0' + today.getDate().toString() : today.getDate().toString();
            var h         = (today.getHours() < 10) ? '0' + today.getHours().toString() : today.getHours().toString();
            var m         = (today.getMinutes() < 10) ? '0' + today.getMinutes().toString() : today.getMinutes().toString();
            var s         = (today.getSeconds() < 10) ? '0' + today.getSeconds().toString() : today.getSeconds().toString();

            var time      = yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;

            var afterPost = configs.afterPost;

            var message   = newHashtag + "\n";
                message  += req.body.message + "\n\n";
                message  += core.il8n.time_submitted + time + "\n";
                message  += afterPost;

            facebookObj.postArticle(message, function (result) {
                if (result === false || typeof result.id == "undefined") {
                    sendResultJson(res, 10, true, 500, "ui_err_fb_postarticle_failed");
                    return false;
                }

                var postID = result.id.split("_")[1];

                sendResultJson(res, 0, false, 200, "ui_posting_succeed", {
                    postURL: config.facebook.postURL.replace("{page_id}", pageID).replace("{postID}", postID),
                    hashtagURL: config.facebook.hashtagURL.replace("{hashtag}", newHashtag.replace("#", "")).replace("{postID}", postID),
                    hashtag: newHashtag,
                    postid: postID
                });
            });
        })
    });
};
