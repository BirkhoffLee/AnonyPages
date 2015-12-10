/*
  @author Birkhoff Lee
 */

module.exports = {
    err_check_this: "錯誤詳情：",
    time_submitted: "文章發佈時間：",
    err_recaptcha_req_failed: "無法與 Google 的伺服器驗證 reCAPTCHA 回應。",
    err_get_feed_failed: "無法取得這個專頁的動態時報：",
    err_post_article_failed: "無法在這個專頁上發佈貼文：",
    err_web_serv_start_failed_eaddrinuse: "無法啟動網頁伺服器 (EADDRINUSE)",
    err_port_already_in_use: "連線埠 {port} 已被其他程式佔用。",
    err_is_this_already_running: "或許是另一個 AnonyPages 實例正在執行？",
    err_web_serv_start_failed: "啟動網頁伺服器失敗。",
    err_errno_is: "錯誤代碼是：",
    web_serv_running_on: "網頁伺服器執行在：",
    ui_err_get_recaptcha_verification_failed: "無法自 Google 取得 reCAPTCHA 驗證回應。",
    ui_err_recaptcha_invalid: "請確認你有勾選 「人類驗證」 區塊內的核取方塊。",
    ui_err_missing_message_field: "無法取得文章內容！",
    ui_err_missing_page_id: "無法取得粉絲專頁編號!",
    ui_err_fb_getfeed_failed: "伺服器無法自臉書伺服器取得該粉絲專頁的最新動態時報！",
    ui_err_article_process_failed: "在處理您的文章時發生了錯誤。",
    ui_err_fb_postarticle_failed: "伺服器無法向臉書伺服器提交您的文章！",
    ui_posting_succeed: "文章發佈完成！",
    ui_render_go_to_your_post: "去看我的文章！",
    ui_render_its_hashtag_is: "您的文章的標籤為：",
    ui_render_post_article_anonymously_to: "匿名發佈貼文到 ",
    ui_render_next_step: "下一步",
    ui_render_terms_of_service: "服務條約",
    ui_render_i_read_tos_carefully: "我已詳閱條款",
    ui_render_human_verification: "人類驗證",
    ui_render_post: "靠北！", // 發文！
    ui_render_posting: "靠北中...", // 發文中...
    ui_render_post_again: "繼續靠北！", // 繼續發文！
    ui_render_Notifications: "通知",
    web_serv_close_press_ctrl_c: "(按下 Ctrl+C 以停止)",
    err_FacebookPage_pageID_not_given: "FacebookPage 模組: 專頁編號未給出",
    err_FacebookPage_accessToken_not_given: "FacebookPage 模組: 專頁 Access Token 未給出",
    notification_fb_getfeed_failed: "無法取得專頁 {pageID} 的最新貼文",
    notification_fb_parseid_failed: "無法取得專頁 {pageID} 的最新貼文編號",
    recvd_getLatestPostIDs: "收到需要取得所有專頁最新貼文編號的要求",
    socketio_serv_running_on: "WebSocket 伺服器執行在：",
    ui_render_connecting_to_facebook: "正在連線至臉書...",
    ui_render_update_your_browser: "請更新您的瀏覽器。",
    ui_render_welcome_username: "歡迎您，{username}!",
    ui_render_new_article_posted: "粉絲專頁有新的貼文！"
};
