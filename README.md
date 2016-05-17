# AnonyPages [![Build Status](https://travis-ci.org/BirkhoffLee/AnonyPages.svg?branch=master)](https://travis-ci.org/BirkhoffLee/AnonyPages)
Posting articles anonymously to Facebook Pages.

# Docker Image
Deploy & run our official Docker image with the following commands (assuming the AnonyPages HTTP service is listening tcp port 1826):

```
$ docker run -itd -p 1826:1826 -v /path/to/anonypages/config.coffee:/var/www/AnonyPages/src/config.coffee:ro birkhofflee/anonypages
```

Docker Hub repository URL: https://hub.docker.com/r/birkhofflee/anonypages/

# Blocking a user
Open /addBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Stop blocking a user
Open /removeBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Decrypting article identifiers
Open /decrypt/{YOUR_ADMIN_KEY}/{IDENTIFIER}
