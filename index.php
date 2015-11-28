<?php
/*
    Made by Birkhoff Lee
    https://fb.com/birkhoff.lee

    Please keep this comment at the beginning
    of this file in order to respect the oringin
    author.
    
    MIT License:
    Copyright (c) 2015 Birkhoff Lee
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
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
    Settings
 */
$page_name    = ""; // Site name
$page_id      = ""; // Page ID
$page_url     = ""; // Page URL. Example: https://www.facebook.com/KaoBeiAVA
$access_token = ""; // Page Access Token. http://goo.gl/W1o9TI
$last         = ""; // Will be added to the end of each posts
$gRsitekey    = ""; // Google Recaptcha Site
$gRsecret     = ""; // Google Recaptcha Secret
$post_label   = ""; // A text before the post input box.
$post_phodr   = ""; // The placeholder of the post input box.
$terms        = ""; // ToS (You should add "<br>" at the end of each lines expect for the last line)

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

if (!isset($posts["data"][0]["message"])) {
    render("提交失敗：系統錯誤（錯誤辨識碼: 0），請私訊粉絲專頁。", false);
}
$_temp = explode(' ', trim($posts["data"][0]["message"]));
$id = substr($_temp[0], strlen("#" . $page_name));
$id = strval(intval($id) + 1);

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
        render("提交成功：貼文應該已經發佈。請前往<a href=\"{$page_url}\">這裡</a>查看", true);
    } else {
        render("提交成功：<a href=\"{$page_url}/posts/" . $__temp[1] . "\">貼文</a>已發佈。", true);
    }
} else {
    render("提交失敗：系統錯誤（錯誤辨識碼: 1），請私訊粉絲專頁。", false);
}
