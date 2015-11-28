<?php
$filename = __DIR__ . "/config.php";
require_once($filename);

function printResult ($array) {
    print(json_encode($array));
    exit;
}

function getPageToken ($token) {
    global $page_id;

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

if (!isset($_POST["userToken"]) or $_POST["userToken"] == "") {
    printResult(array(
        "code" => 1,
        "msg" => "Token not given."
        ));
}

$userToken = $_POST["userToken"];
$pageInfo  = getPageToken($userToken);
if ($pageInfo === false) {
    printResult(array(
        "code" => 2,
        "msg" => "Invaild token given. (Or you aren't the admin of this system?)"
        ));
}

/*
    Now we got short-lived access token,
    get long-lived access token now
 */

global $app_id;
global $app_secret;
$shortToken = $pageInfo["access_token"];

if (!$res = file_get_contents('https://graph.facebook.com/oauth/access_token?client_id=' . $app_id . '&client_secret=' . $app_secret . '&grant_type=fb_exchange_token&fb_exchange_token=' . $shortToken)) {
    printResult(array(
        "code" => 3,
        "msg" => "Failed requesting the long-lived access token."
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

global $access_token;
$find     = '$access_token = "' . $access_token . '";';
$replace  = '$access_token = "' . $newToken . '";';
$contents = str_replace('$access_token = "' . $access_token . '";', $replace, $contents);

if (fwrite($fp, $contents) === false) {
    printResult(array(
        "code" => 7,
        "msg" => "Could not write the new config to the config file."
        ));
}

fclose($fp);
printResult(array(
    "code" => 0,
    "msg" => "Token updated.",
    // "pagetoken" => $newToken
    ));
