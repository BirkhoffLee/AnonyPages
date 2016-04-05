var access_token = "unauthorized";

window.fbAsyncInit = function () {
    FB.init({
        appId      : window.fb_app_id,
        cookie     : true,
        version    : 'v2.2',
        xfbml      : true,
        oauth      : true
    });

    checkFacebookLogin();
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkFacebookLogin () {
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            access_token = response.authResponse.accessToken;
        } else {
            FB.login(function (response) {
                checkFacebookLogin();
            });
        }
    });
}

$(document).ready(function () {
    oSubmitBtnVal = $("#submitBtn").val();

    $("#firstBtnTitle").on("click", function (e) {
        if (this.html() == AnonyPages.il8n.post_again) {
            grecaptcha.reset();
            $("#message").val("");
        }
    });

    $("#submitBtn").on("click", function (e) {
        e.preventDefault();

        $("#submitBtn").val(AnonyPages.i18n.posting);

        var formData = {};
        formData["g-recaptcha-response"] = $(".g-recaptcha-response").val();
        formData["message"] = $("#message").val();
        formData.o = access_token;

        $.ajax({
            url: $("#mainForm").attr('action'),
            type: "POST",
            data: formData,
            dataType: "json"
        }).always(function (res) {
            if (typeof res.responseJSON == "undefined") {
                data = res;
            } else {
                data = res.responseJSON;
            }

            $('*').animate({ scrollTop : 0 }, 1250);

            var style = (data.err == 1) ? "color: #FFEE58 !important" : "";

            if (typeof data.result == "undefined") {
                var msg = data.message;
            } else {
                var msg  = data.message + "&nbsp;&nbsp;";
                    msg += "<a href=\"" + data.result.postURL + "\">";
                    msg += AnonyPages.i18n.go_to_your_post;
                    msg += "</a>";
                    msg += "<br />" + AnonyPages.i18n.its_hashtag_is;
                    msg += "<a href=\"" + data.result.hashtagURL + "\">";
                    msg += data.result.hashtag;
                    msg += "</a>";
            }

            $("#title_message").html("<span style=\"" + style + "\">" + msg + "</span>");

            $("#submitBtn").val(oSubmitBtnVal);
            $("#firstBtnTitle").html(AnonyPages.i18n.post_again);
        });
    });
});
