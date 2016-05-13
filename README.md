# AnonyPages [![Build Status](https://travis-ci.org/BirkhoffLee/AnonyPages.svg?branch=master)](https://travis-ci.org/BirkhoffLee/AnonyPages)
Posting articles anonymously to Facebook Pages.

# Docker Image
Run our official Docker container with an interactive shell with this command (assuming you are running AnonyPages HTTP service on port 1826):

```
$ docker exec -it $(docker run -itd -p 1826:1826 -p 2022:22 birkhofflee/anonypages) /bin/bash -c "echo 'YOUR_SSH_PUBKEY_HERE' >> ~/.ssh/authorized_keys && service ssh start"
```
Replace "YOUR_SSH_PUBKEY_HERE" to your SSH public key.

SSH into the container by:
```
$ ssh -p 2022 DOCKER_SERVER_ADDR
```

Upload your AnonyPages configuration to /var/www/Anonypages/src in the container, then run these in the container:
```
$ cd /var/www/Anonypages/src
$ forever start -c coffee index.coffee
```

Then, you will need to configure the nginx settings (or other simlar applications) in the Docker daemon's host. We have a default configuration here:
```
server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        server_name YOUR_DOMAIN_NAME;

        location / {
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_pass http://127.0.0.1:1826/;
        }
}
```

Restart nginx, and you are done.  
```
$ service nginx restart
```

Docker Hub repository URL: https://hub.docker.com/r/birkhofflee/anonypages/

# Blocking a user
Open /addBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Stop blocking a user
Open /removeBlacklist/{YOUR_ADMIN_KEY}/{IDENTIFIER}

# Decrypting article identifiers
Open /decrypt/{YOUR_ADMIN_KEY}/{IDENTIFIER}
