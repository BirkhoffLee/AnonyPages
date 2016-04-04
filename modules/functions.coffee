module.exports =
    notFound: (req, res) ->
        res.status 404
        res.send "404 page not found: #{req.url}"