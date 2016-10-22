FROM ubuntu:14.04

MAINTAINER Birkhoff Lee <admin@birkhoff.me>

# Set the environment up
WORKDIR ~
RUN apt-get update; \
    apt-get upgrade -y; \
    apt-get install nano nodejs-legacy npm git ca-certificates -y -q --no-install-recommends; \
    apt-get clean; \
    apt-get autoclean; \
    apt-get autoremove; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install forever and coffeeScript library
RUN npm i -g forever coffee-script

# Download AnonyPages
WORKDIR ~
RUN touch build_160703001; \
    mkdir /var/www; \
    chmod 755 /var/www; \
    cd /var/www; \
    git clone https://github.com/BirkhoffLee/AnonyPages

# Prepare AnonyPages
WORKDIR /var/www/AnonyPages
RUN npm i

# Ports
EXPOSE 1826

# Run
WORKDIR /var/www/AnonyPages/src
CMD /bin/bash -c "forever start -c coffee index.coffee &> /dev/null && forever logs -f 0"
