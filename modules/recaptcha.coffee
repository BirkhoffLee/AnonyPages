Q 		= require "q"
request = require "request"

module.exports =
	verify: (gResponse) ->
		deferred = Q.defer()
		config	 = global.AnonyPages.config.googleRecaptcha
		url 	 = config.verifyURL

		request.post
	        url      : config.verifyURL
	        encoding : null
	        gzip     : true
	        form     : {
	            secret: config.siteSecret
	            response: gResponse
	        }
	        followRedirect: true
	    , (error, response, body) ->
	        if error
	        	deferred.reject "recaptcha!"

	        try
	        	jsonResult = JSON.parse body.toString()
	        catch e
	        	deferred.reject "recaptcha!"

	        if not jsonResult.success
	        	deferred.reject "recaptcha"

	        deferred.resolve()

	    deferred.promise