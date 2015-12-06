core.server.get('/error/500', function (req, res) {
    res.status(500);

    res.render("error/back", {
        // Sorry, the server encountered an error processing your request.
        // Please contact the admin of the facebook page.
        message: "抱歉，伺服器無法處理您的請求。請私訊專頁管理者！"
    });
});
