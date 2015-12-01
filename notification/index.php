<?php
$filename = __DIR__ . "/../config.php";
require_once($filename);

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

$page_ids = array();
$page_names = array();
$_page_names = "";
$app_id = $config["global"]["app_id"];

unset($config["global"]);

foreach ($config as $key => $value) {
    array_push($page_ids, '"' . $key . '"');
    $page_names[$key] = $value["page_name"];
}
$page_ids = implode(",", $page_ids);

foreach ($page_names as $_key => $_value) {
    $_page_names .= "\"{$_key}\":\"{$_value}\",";
}
$_page_names = substr($_page_names, 0, strlen($_page_names) - 1);
?>
<!DOCTYPE html>
<html>
<head>
<title>監控新貼文 - 由靠北AVA提供的靠北系統</title>
<meta charset="UTF-8">
<link href="../favicon.ico" rel="shortcut icon">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
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
lastPostID = "first";
access_token = "";
pageIDs = [<?php echo $page_ids; ?>];
pageNames = {<?php echo $_page_names; ?>};

window.fbAsyncInit = function () {
    FB.init({
        appId      : '<?php echo $app_id; ?>',
        cookie     : true,
        version    : 'v2.2',
        xfbml      : true,
        oauth      : true
    });

    startMonitor();
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function startMonitor () {
    if (!Notification) {
        return false;
    }

    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            access_token = response.authResponse.accessToken;

            FB.api('/me', function (r) {
                userName = r.name;

                $(document).ready(function () {
                    $('#status').fadeOut("slow", function () {
                        $('#status').html("Welcome, " + userName + '!');
                        $('#status').fadeIn("slow");
                    });

                    monitorPosts();
                });
            });
        } else {
            FB.login(function (response) {
                startMonitor();
            });
        }
    });
}
function monitorPosts () {
    $.post("getFeed.php", {access_token: access_token}, function (data) {
        if (typeof data.error != "undefined") {
            return false;
        }

        nowIDs = data;

        if (lastPostID != "first") {
            for (var key in nowIDs) {
                if (nowIDs[key] != lastPostID[key]) {
                    var icon = "https://graph.facebook.com/v2.5/" + key + "/picture?type=normal";
                    var postid = nowIDs[key].split("_")[1];

                    pushNotification(icon, "有新的貼文發佈了！", pageNames[key], function () {
                        window.open("https://www.facebook.com/permalink.php?story_fbid=" + postid + "&id=" + key);
                    });
                }
            }
        }

        lastPostID = nowIDs;
    }, "json");

    setTimeout(monitorPosts, 300000);
    return true;
}

function pushNotification (icon, message, title, onclick) {
    if (!Notification) {
        return false;
    }

    var options = {
        dir: "ltr",
        lang: "utf-8",
        icon: icon,
        body: message
    };
    if (Notification.permission === "granted") {
        var n = new Notification(title, options);
        n.onclick = onclick;
        n.onerror = function() {
            console.log("There was an error with the notification!");
        }
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }

            if (status === "granted") {
                var n = new Notification(title, options);
                n.onclick = onclick;
                n.onerror = function() {
                    console.log("There was an error with the notification!");
                }
            }
        });
    }
}

$(document).ready(function () {
    if (!Notification) {
        $('#status').fadeOut("slow", function () {
            $('#status').html("Please use <a href=\"https://chrome.google.com\">Chrome</a> in order to view this page.");
            $('#status').fadeIn("slow");
        });
        return false;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }
});
</script>

<div id="status">Connecting to Facebook..</div>

</body>
</html>
