<?php
global $filename;
$filename = __DIR__ . "/config.php";

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

/*
    Load config
 */
require_once($filename);
global $config;


/*
    Functions
 */
function printResult ($array) {
    print(json_encode($array));
    exit;
}

function getPageToken ($token, $page_id) {
    $response = json_decode(file_get_contents("https://graph.facebook.com/v2.5/me/accounts?access_token=" . $token), true);

    if (!isset($response["data"])) {
        return false;
    }

    foreach ($response["data"] as $key => $value) {
        if ($value["id"] == $page_id) {
            return $value;
        }
    }

    return false;
}


/*
    Get usertoken from login
 */
if (!isset($_POST["userToken"]) or $_POST["userToken"] == "") {
    printResult(array(
        "code" => 1,
        "msg" => "Token not given."
        ));
}


/*
    Tpdate tokens
 */
$app_id     = $config["global"]["app_id"];
$app_secret = $config["global"]["app_secret"];
unset($config["global"]);

foreach ($config as $key => $value) {
    $page_id      = $key;
    $access_token = $value["access_token"];

    $userToken = $_POST["userToken"];
    $pageInfo  = getPageToken($userToken, $page_id);
    if ($pageInfo === false) {
        printResult(array(
            "code" => 2,
            "msg" => "Invaild token given. (Or you aren't the admin of this system?)",
            "pageid" => $page_id
            ));
    }

    /*
        Now we got short-lived access token,
        get long-lived access token now
     */

    $shortToken = $pageInfo["access_token"];
    $url  = "https://graph.facebook.com/oauth/access_token";
    $url .= "?client_id=" . $app_id;
    $url .= "&client_secret=" . $app_secret;
    $url .= "&grant_type=fb_exchange_token";
    $url .= "&fb_exchange_token=" . $shortToken;

    if (!$res = file_get_contents($url)) {
        printResult(array(
            "code" => 3,
            "msg" => "Failed requesting the long-lived access token.",
            "pageid" => $page_id
            ));
    }

    $oldAccessToken = $access_token;
    parse_str($res);
    $newToken = $access_token;
    $access_token = $oldAccessToken;

    if (!is_writable($filename)) {
        printResult(array(
            "code" => 4,
            "msg" => "config.php is not writable."
            ));
    }

    if (!$contents = file_get_contents($filename)) {
        printResult(array(
            "code" => 5,
            "msg" => "Could not read the current config."
            ));
    }

    if (!$fp = fopen($filename, 'w')) {
        printResult(array(
            "code" => 6,
            "msg" => "Could not open config.php."
            ));
    }

    $find     = '$config[$pageid]["access_token"] = "' . $oldAccessToken . '";';
    $replace  = '$config[$pageid]["access_token"] = "' . $newToken . '";';
    $contents = str_replace($find, $replace, $contents);

    if (fwrite($fp, $contents) === false) {
        printResult(array(
            "code" => 7,
            "msg" => "Could not write the new config to the config file.",
            ));
    }

    fclose($fp);
}

printResult(array(
    "code" => 0,
    "msg" => "All tokens updated."
    ));
