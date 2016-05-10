# AnonyPages [![Build Status](https://travis-ci.org/BirkhoffLee/AnonyPages.svg?branch=master)](https://travis-ci.org/BirkhoffLee/AnonyPages)
Posting articles anonymously to Facebook Pages.

# Docker Image
Run our official Docker container with an interactive shell with this command:

```
$ docker exec -it $(docker run -itd birkhofflee/anonypages) bash
```

View more: [birkhofflee/anonypages on Docker Hub](https://hub.docker.com/r/birkhofflee/anonypages/)

# Blocking a user
Open /addBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Stop blocking a user
Open /removeBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Decrypting article identifiers
Open /decrypt/{YOUR_ADMIN_KEY}/{IDENTIFIER}
