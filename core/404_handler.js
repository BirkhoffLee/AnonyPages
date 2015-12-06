core.server.use(function(req, res, next){
    res.status(404);

    res.render('error/404', { url: req.url });
});
