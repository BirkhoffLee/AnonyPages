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

function printResult ($array) {
    print(json_encode($array));
    exit;
}

if (!isset($_POST["access_token"])) {
    printResult(array("error" => "Token not given."));
}

$access_token = $_POST["access_token"];

$ids = array();
unset($config["global"]);

foreach ($config as $page_id => $value) {
    $urlGetPosts  = "https://graph.facebook.com/{$page_id}/posts?access_token={$access_token}";
    $feed = json_decode(file_get_contents($urlGetPosts), true);
    $ids[$page_id] = $feed["data"][0]["id"];
}

printResult($ids);
