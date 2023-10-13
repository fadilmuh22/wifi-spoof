FROM ubuntu:jammy

# install hostapd and dnsmasq
RUN apt-get update && apt-get install -y hostapd dnsmasq apache2

# copy config files
COPY ./dnsmasq.conf /etc/dnsmasq.conf
COPY ./hostapd.conf /etc/hostapd/hostapd.conf

RUN dnsmasq -C /etc/dnsmasq.conf
RUN hostapd /etc/hostapd/hostapd.conf -B

# copy web files
COPY ./html /var/www/
COPY ./server /var/www/server

# apache config
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN server apache2 start

# run node server
RUN apt-get install -y nodejs npm && npm install -g yarn
RUN cd /var/www/server && yarn && yarn dev
