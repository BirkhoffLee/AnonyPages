core.server.get('/error/page', function (req, res) {
    res.status(400);

    res.render("error/normal", {
        // Sorry, we don't recognize this facebook page. Check your url and try again.
        message: "抱歉，您輸入的網址（粉絲專頁 ID）有誤。請檢查並再試一次。"
    });
});
