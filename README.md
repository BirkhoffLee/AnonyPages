<p align="center">
    <img src="https://rawgit.com/BirkhoffLee/AnonyPages/master/logo.svg"
         height="120">
</p>
<p align="center">
    <a href="https://microbadger.com/images/birkhofflee/anonypages">
        <img src="https://images.microbadger.com/badges/image/birkhofflee/anonypages.svg"
             alt="Docker Image Layers">
    </a>
    <a href="https://hub.docker.com/r/birkhofflee/anonypages">
        <img src="https://img.shields.io/docker/pulls/birkhofflee/anonypages.svg"
             alt="Docker Pulls">
    </a>
    <a href="https://drone.birkhoff.me/BirkhoffLee/AnonyPages">
        <img src="https://drone.birkhoff.me/api/badges/BirkhoffLee/AnonyPages/status.svg"
             alt="Build Status">
    </a>
</p>
<p align="center">
    <sup><i>Posting articles anonymously to Facebook Pages has never been so easy.</i></sup>
</p>

# Deployment
I strongly recommend deploying using [Docker](https://www.docker.com/). DOCKER SAVES YOUR LIFE.  

I usually run a website on Docker with [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy), and I recommend you to use it too. So simply modify the configuration file, re-name it to `config.coffee` and run the following commands to launch AnonyPages:

```
$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
$ touch /path/to/blacklist.list
$ docker run -itd -P -v /path/to/config.coffee:/var/www/AnonyPages-master/src/config.coffee:ro -v /path/to/blacklist.list:/var/www/AnonyPages-master/src/blacklist.list -e "VIRTUAL_HOST=DOMAIN_1(,DOMAIN_2,...)" birkhofflee/anonypages
```

For wildcard hosts please check this out: [https://github.com/jwilder/nginx-proxy/blob/master/README.md#wildcard-host](https://github.com/jwilder/nginx-proxy/blob/master/README.md#wildcard-hosts).

The first post will fail to post due to an unknown bug in AnonyPages, please **manually** post the first post using the format as below:

```
#{YOUR_HASHTAG_HERE}1
blablablabla
```

For example, if your hashtag is `apple`, you will need to post this to your page manually:
```
#apple1
blablablabla
```

# Blocking A Facebook User
Open `/addBlacklist/<YOUR_ADMIN_KEY>/<HASH>`

# Unblocking A Facebook User
Open `/removeBlacklist/<YOUR_ADMIN_KEY>/<HASH>`

# Contributing
Only one rule: **Test before submitting a pull request**.

# Security Reportings
Please contact [admin@birkhoff.me](mailto:admin@birkhoff.me).

# License
See [LICENSE](LICENSE).
