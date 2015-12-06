core.server.get('/error/400', function (req, res) {
    res.status(400);

    res.render("error/back", {
        // Sorry, we cannot process your request. Check your url and try again.
        message: "抱歉，您的要求有誤。請檢查並再試一次。"
    });
});
