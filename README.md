# AnonyPages [![](https://img.shields.io/badge/Docker%20Hub-BirkhoffLee%2Fanonypages-blue.svg)](https://hub.docker.com/r/birkhofflee/anonypages/) [![](https://images.microbadger.com/badges/image/birkhofflee/anonypages.svg)](https://microbadger.com/images/birkhofflee/anonypages) ![Docker Stars](https://img.shields.io/docker/stars/birkhofflee/anonypages.svg) ![Docker Pulls](https://img.shields.io/docker/pulls/birkhofflee/anonypages.svg)
Posting articles anonymously to Facebook Pages.

# Deployment
I usually run a website on Docker with [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy), and I recommend you to use it too. So simply run the following to launch AnonyPages:

```
$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
$ touch /path/to/blacklist.list
$ docker run -itd -P -v /path/to/config.coffee:/var/www/AnonyPages-master/src/config.coffee:ro -v /path/to/blacklist.list:/var/www/AnonyPages-master/src/blacklist.list -e "VIRTUAL_HOST=DOMAIN_1(,DOMAIN_2,...)" birkhofflee/anonypages
```

For wildcard hosts please check this out: https://github.com/jwilder/nginx-proxy/blob/master/README.md#wildcard-hosts

# Blocking a user
Open `/addBlacklist/<YOUR_ADMIN_KEY>/{IDENTIFIER}`

# Stop blocking a user
Open `/removeBlacklist/<YOUR_ADMIN_KEY>/{IDENTIFIER}`

# Contributing
Only one rule: **Test before submitting a pull request**.

# Security Reports
Please contact [admin@birkhoff.me](mailto:admin@birkhoff.me), thank you very much.

# License
See [LICENSE](LICENSE).
