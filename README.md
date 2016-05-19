# AnonyPages [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]() [![Build Status](https://travis-ci.org/BirkhoffLee/AnonyPages.svg?branch=master)](https://travis-ci.org/BirkhoffLee/AnonyPages)
Posting articles anonymously to Facebook Pages.

# Docker Image
Deploy & run our official Docker image with the following commands (assuming the AnonyPages HTTP service is listening tcp port 1826):

```
$ docker run -v /root/AnonyPages/config.coffee:/var/www/AnonyPages/src/config.coffee:ro -itd -p 80:1826 birkhofflee/anonypages
```

Use this command to view the logs:

```
$ docker logs [CONTAINER ID]
```

Docker Hub repository URL: https://hub.docker.com/r/birkhofflee/anonypages/

# Blocking a user
Open /addBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Stop blocking a user
Open /removeBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Decrypting article identifiers
Open /decrypt/{YOUR_ADMIN_KEY}/{IDENTIFIER}
