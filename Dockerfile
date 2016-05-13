FROM ubuntu:14.04

MAINTAINER Birkhoff Lee <birkhoff.lee.cn@gmail.com>

# Set the environment up
WORKDIR ~
RUN apt-get update; \
    apt-get upgrade -y; \
    apt-get install openssh-server nodejs-legacy npm git nginx -y --no-install-recommends; \
    apt-get purge landscape-client landscape-common; \
    apt-get clean; \
    apt-get autoclean; \
    apt-get autoremove; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*; \
    mkdir ~/.ssh; \
    touch ~/.ssh/authorized_keys \
    /etc/init.d/ssh restart

# Set MOTD
RUN printf " \
=========================\n \
Welcome to the Docker container of AnonyPages. Here are some instructions for you to get started:\n\n \
\
1. Add your SSH public key to ~/.ssh/authorized_keys.\n \
2. Upload your AnonyPages configuration file to /var/www/AnonyPages/src.\n \
3. Edit your nginx configuration at /etc/nginx/sites-available.\n \
4. Launch AnonyPages with the following commands:\n \
     $ cd /var/www/AnonyPages/src/\n \
     $ forever start -c coffee index.coffee\n \
5. You can get the path of log file of AnonyPages by the command below:\n \
     $ forever logs\n \
6. Detaching the shell by pressing Ctrl/Cmd - P - Q.\n\n \
\
By the way, if you have any problem, you can give me an issue on https://github.com/BirkhoffLee/AnonyPages/issues/new.\n \
=========================\n\n" > /etc/motd

# Install forever and coffeeScript library
RUN npm i -g forever coffee-script

# Download AnonyPages
WORKDIR ~
RUN mkdir /var/www; \
    chmod 755 /var/www; \
    cd /var/www; \
    git clone https://github.com/BirkhoffLee/AnonyPages

# Prepare AnonyPages
WORKDIR /var/www/AnonyPages
RUN npm i

# Ports
EXPOSE 80 443 22/udp

# Start sshd
RUN service ssh start
