$(document).ready(function () {
    $("#firstBtnTitle").on("click", function (e) {
        if ($("#firstBtnTitle").html() == AnonyPages.il8n.ui_render_post_again) {
            grecaptcha.reset();
            $("#message").val("");
        }
    });

    $("#submitBtn").on("click", function (e) {
        e.preventDefault();

        var oSubmitBtnVal = $("#submitBtn").val();
        $("#submitBtn").val(AnonyPages.il8n.ui_render_posting);

        var formData = {};
        formData["g-recaptcha-response"] = $(".g-recaptcha-response").val();
        formData["message"] = $("#message").val();

        $.ajax({
            url: $("#mainForm").attr('action'),
            type: "POST",
            data: formData,
            dataType:"html",
            success: function (data) {
                data = JSON.parse(data);

                $('html, body').animate({ scrollTop : 0 }, 1250);

                var style = (data.err === true) ? "color: #ffccc" : "";

                if (typeof data.result == "undefined") {
                    var msg = data.message;
                } else {
                    var msg  = data.message + "<br />" + AnonyPages.il8n.ui_render_its_hashtag_is;
                        msg += "<a href=\"" + data.result.hashtagURL + "\">";
                        msg += data.result.hashtag;
                        msg += "</a>&nbsp;&nbsp;";
                        msg += "<a href=\"" + data.result.postURL + "\">";
                        msg += AnonyPages.il8n.ui_render_go_to_your_post;
                        msg += "</a>" + ;
                }

                $("#title_message").html("<span style=\"" + style + "\">" + msg + "</span>");

                $("#submitBtn").val(oSubmitBtnVal);
                $("#firstBtnTitle").html(AnonyPages.il8n.ui_render_post_again);
            }
        });
    });
});
