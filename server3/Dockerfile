FROM alpine:3.15
RUN apk add --update nodejs npm

# Runs as root
# Update security 
# RUN apt-get update && apt-get -y upgrade
# RUN useradd --create-home appuser
# RUN mkdir /home/appuser/app
# WORKDIR /home/appuser/app
RUN mkdir /app
WORKDIR /app

ENV OPENSSL_CONF=/etc/ssl/
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --silent --progress=false --production
COPY . .
CMD ["npm", "start"]