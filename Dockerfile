FROM node:0.10-slim

MAINTAINER Birkhoff Lee <admin@birkhoff.me>

WORKDIR ~
RUN export NODE_ENV=production; \
    echo "deb http://deb.debian.org/debian jessie main" > /etc/apt/sources.list; \
    apt-get update; \
    apt-get install unzip wget -y -q --no-install-recommends; \
    npm i -g forever coffee-script; \
    mkdir /var/www; \
    chmod 755 /var/www; \
    cd /var/www; \
    wget "https://github.com/BirkhoffLee/AnonyPages/archive/master.zip"; \
    unzip master.zip -d .; \
    rm master.zip; \
    cd jumper-master; \
    npm install; \
    apt-get clean; \
    apt-get autoclean; \
    apt-get autoremove -y; \
    apt-get remove --purge -y $BUILD_PACKAGES $(apt-mark showauto); \
    rm -rf /var/lib/{apt,dpkg,cache,log}/ /tmp/* /var/tmp/*;

EXPOSE 1829

WORKDIR /var/www/AnonyPages/src
CMD /bin/bash -c "forever start -c coffee index.coffee &> /dev/null && forever logs -f 0"