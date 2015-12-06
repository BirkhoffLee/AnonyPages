core.server.get('/error/captcha', function (req, res) {
    res.status(400);

    res.render("error/back", {
        // Please make sure you checked the check box in Human Verification section!
        message: "請確認是否已經勾選了人類驗證的核取方塊！"
    });
});
