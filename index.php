<?php
/*
    Made by Birkhoff Lee
    https://fb.com/birkhoff.lee

    Please keep this comment at the beginning
    of this file in order to respect the oringin
    author.
 */

header("Content-type: text/html; charset=utf-8");
ini_set("date.timezone", "Asia/Taipei");
date_default_timezone_set("Asia/Taipei");

/*
    Production error displaying settings
 */
ini_set("display_errors", '0');
error_reporting(0);

/*
    Load settings
 */
require_once(__DIR__ . "/config.php");
global $page_name, $page_id, $page_url, $access_token, $last, $gRsecret, $post_label, $post_phodr, $terms;

/*
    Facebook Graph API URLs
 */
$urlGetPosts  = "https://graph.facebook.com/{$page_id}/posts?access_token={$access_token}";
$urlPostPosts = "https://graph.facebook.com/v2.5/{$page_id}/feed";

/*
    Functions
 */
function render ($tip, $status) {
    $code = file_get_contents(__DIR__ . "/template.html");

    /* {{tip}} */
    $color = ($status) ? "green" : "red";
    $tipTo = ($tip == "") ? "" : "<br /><br /><span style=\"color: " . $color . "\">" . $tip . "</span>";
    $code = str_replace("{{tip}}", $tipTo, $code);

    /* {{page_name}} */
    global $page_name;
    $code = str_replace("{{page_name}}", $page_name, $code);

    /* {{page_url}} */
    global $page_url;
    $code = str_replace("{{page_url}}", $page_url, $code);

    /* {{post_label}} */
    global $post_label;
    $code = str_replace("{{post_label}}", $post_label, $code);

    /* {{post_placeholder}} */
    global $post_phodr;
    $code = str_replace("{{post_placeholder}}", $post_phodr, $code);

    /* {{terms}} */
    global $terms;
    $code = str_replace("{{terms}}", $terms, $code);

    /* {{gRsitekey}} */
    global $gRsitekey;
    $code = str_replace("{{gRsitekey}}", $gRsitekey, $code);

    die($code);
}

function verifyHuman ($g_recaptcha_response) {
    global $gRsecret;
    $arguments = "secret={$gRsecret}&response={$g_recaptcha_response}";
    $getResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?" . $arguments);
    $answers = json_decode($getResponse, true);

    if (trim($answers['success']) == true) {
        return true;
    } else {
        return false;
    }
}

function startsWith($str, $find) {
    return $find === "" || strrpos($str, $find, -strlen($str)) !== FALSE;
}

/*
    Echo html codes
 */
if (!isset($_POST["action"]) or $_POST["action"] != "post") {
    render("", false);
}

if (!isset($_POST["post"]) or $_POST["post"] == "") {
    render("提交失敗：請輸入靠北內容。", false);
}

if (!isset($_POST["g-recaptcha-response"]) or $_POST["g-recaptcha-response"] == "") {
    render("提交失敗：人類驗證失敗。", false);
}

if (!verifyHuman($_POST["g-recaptcha-response"])) {
    render("提交失敗：人類驗證失敗。", false);
}

/*
    Get the id of the last post and plus 1 as the id of
    the post we are posting
 */
$posts = json_decode(file_get_contents($urlGetPosts), true);

if (!isset($posts["data"])) {
    render("提交失敗：系統錯誤（錯誤辨識碼: 0），請私訊粉絲專頁。", false);
}
foreach ($posts["data"] as $key => $value) {
    if (startsWith($value["message"], "#" . $page_name)) {
        $_temp = explode(' ', trim($value["message"]));
        $id = substr($_temp[0], strlen("#" . $page_name));
        $id = strval(intval($id) + 1);
        break;
    }
}

if (!isset($id)) {
    render("提交失敗：系統錯誤（錯誤辨識碼: 1），請私訊粉絲專頁。", false);
}

/*
    Post time
 */
$time = "\n\n文章發佈時間：" . date('Y-m-d  H:i:s');

/*
    Convert vars into postfields
 */
$vars = 'message=' . urlencode("#{$page_name}{$id}\n" . $_POST["post"] . "{$time}\n{$last}") . '&access_token=' . $access_token;

/*
    Send request
 */
$ch   = curl_init($urlPostPosts);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, $vars);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);

/*
    Get status
 */
$resJson = json_decode($response, true);
if (isset($resJson["id"]) and $resJson["id"] != "") {
    $__temp = explode('_', $resJson["id"]);
    if (!isset($__temp[1])) {
        render("提交成功：貼文應該已經發佈。", true);
    } else {
        render("提交成功：<a href=\"https://www.facebook.com/permalink.php?story_fbid=" . $__temp[1] . "&id={$page_id}\" target=\"_blank\">貼文</a>已成功發佈。為了日後方便尋<br />找您的貼文，請記住您的貼文標籤：<a href=\"https://www.facebook.com/hashtag/{$page_name}{$id}?story_id=" . $__temp[1] . "\" target=\"_blank\">#{$page_name}{$id}</a>", true);
    }
} else {
    render("提交失敗：系統錯誤（錯誤辨識碼: 2），請私訊粉絲專頁。", false);
}
