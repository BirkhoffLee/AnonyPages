core.server.get('/', function (req, res) {
    res.redirect('/error/page');
    return true;
});
