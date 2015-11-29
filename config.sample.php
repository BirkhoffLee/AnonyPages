<?php
/*
    Settings

    Rename this file to config.php after you
    complete editing the configuration
 */

global $config;
// ======================

/*
    Common
 */

// Fill in "DEBUG" if you are getting into trouble
// otherwise, fill in "PRODUCTION"
define("RUN_STATE", "PRODUCTION");

// Facebook App ID
$config["global"]["app_id"]     = "";

// Facebook App Secret
$config["global"]["app_secret"] = "";

// Google Recaptcha Site Key
$config["global"]["gRsitekey"]  = "";

// Google Recaptcha Secret Key
$config["global"]["gRsecret"]   = "";

/*
    Settings for each pages
 */

// ===================


/*
    First page
 */
                                    // Page ID
$pageid                             = "";
                                    // Page name
$config[$pageid]["page_name"]       = "";
                                    // Post hashtags
$config[$pageid]["hashtag"]         = "";
                                    // Page URL
$config[$pageid]["page_url"]        = "";
                                    // Additional text after each posts
$config[$pageid]["last"]            = "";
                                    // The text before the post input box
$config[$pageid]["post_label"]      = "";
                                    // The placeholder of the post input box.
$config[$pageid]["post_phodr"]      = "";
                                    // ToS (You should add "<br>" at the end of each lines expect for the last line)
$config[$pageid]["terms"]           = "";

$config[$pageid]["access_token"] = ""; // FILL THIS WITH THE PAGE ID!!

// ===================

/*
    Second page
 */
                                    // Page ID
$pageid                             = "";
                                    // Page name
$config[$pageid]["page_name"]       = "";
                                    // Post hashtags
$config[$pageid]["hashtag"]         = "";
                                    // Page URL
$config[$pageid]["page_url"]        = "";
                                    // Additional text after each posts
$config[$pageid]["last"]            = "";
                                    // The text before the post input box
$config[$pageid]["post_label"]      = "";
                                    // The placeholder of the post input box.
$config[$pageid]["post_phodr"]      = "";
                                    // ToS (You should add "<br>" at the end of each lines expect for the last line)
$config[$pageid]["terms"]           = "";

$config[$pageid]["access_token"] = ""; // FILL THIS WITH THE PAGE ID!!

// or more.....
