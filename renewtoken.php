<?php
$filename = __DIR__ . "/config.php";
require_once($filename);
global $config;

/*
    Error displaying settings
 */
if (RUN_STATE == "DEBUG") {
    ini_set("display_errors", 'on');
    error_reporting(E_ALL);
} else {
    ini_set("display_errors", 'off');
    error_reporting(0);
}
?>
<!DOCTYPE html>
<html>
<head>
<title>更新 Page Access Token - 由靠北AVA提供的靠北系統</title>
<meta charset="UTF-8">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<link href="favicon.ico" rel="shortcut icon">
<style type="text/css">
    body {
        background-color: #e9eaed;
        font-family: "Microsoft Jhenghei UI", "Tahoma", "Segoe UI Light", sans-serif
    }

    #status {
        width: 100%;
        text-align: center;
        top: 40%;
        position: absolute;
        font-size: 50px
    }
</style>
</head>

<body>
<script>
userName = "";

window.fbAsyncInit = function() {
    FB.init({
        appId      : '<?php echo $config["global"]["app_id"]; ?>',
        cookie     : true,
        version    : 'v2.2',
        xfbml      : true,
        oauth      : true
    });

    postAccessToken();
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function postAccessToken() {
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            FB.api('/me', function(r) {
                userName = r.name;

                $(document).ready(function() {
                    $('#status').fadeOut("slow", function () {
                        $('#status').html("Welcome, " + userName + '!<br />Updating page access token now...');
                        $('#status').fadeIn("slow");
                    });

                    $.post("updateToken.php", { userToken: response.authResponse.accessToken }, function (data) {
                        $('#status').fadeOut("slow", function () {
                            var json = JSON.parse(data);
                            var status;
                            if (json.code != 0) {
                                status = "<span style=\"color:red\">" + json.msg + "</span>";
                            } else {
                                status = "<span style=\"color:green\">" + json.msg + "</span>";
                            }
                            $('#status').html(status);
                            $('#status').fadeIn("slow");
                        });
                    });
                });
            });
        } else {
            FB.login(function (response) {
                postAccessToken();
            });
        }
    });
}
</script>

<div id="status">Connecting to Facebook..</div>

</body>
</html>
