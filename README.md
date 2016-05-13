# AnonyPages [![Build Status](https://travis-ci.org/BirkhoffLee/AnonyPages.svg?branch=master)](https://travis-ci.org/BirkhoffLee/AnonyPages)
Posting articles anonymously to Facebook Pages.

# Docker Image
Run our official Docker container with an interactive shell with this command:
> Assuming you are running AnonyPages HTTP service on port 1826

```
$ docker exec -it $(docker run -itd -p 1826:1826 -p 2022:22 birkhofflee/anonypages) /bin/bash -c "echo 'YOUR_SSH_PUBKEY_HERE' >> ~/.ssh/authorized_keys && service ssh start"
```

And any other computers which can access your Docker server..
```
$ ssh -p 2022 DOCKER_SERVER_ADDR
```

View more: [birkhofflee/anonypages on Docker Hub](https://hub.docker.com/r/birkhofflee/anonypages/)

# Blocking a user
Open /addBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Stop blocking a user
Open /removeBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Decrypting article identifiers
Open /decrypt/{YOUR_ADMIN_KEY}/{IDENTIFIER}
