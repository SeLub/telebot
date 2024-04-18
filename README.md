# PostUp Telegram auto-posting application

## Server

Moleculer, PostgreSQL,
REST API

### Database

Database is exposed by [Render](https://render.com/).

Region: Frankfurt (EU Central)
Instance Type: Free RAM:256MB CPU:100m Storage: 1 GB

**IMPORTANT!**. Your database will expire on May 8, 2024. The database will be deleted unless you upgrade to a paid instance type.
**IMPORTANT!**. You can not connect to DB using free Proton VPN. Disconnect VPN before start server locally.

### File Storage

File storage is exposed by [Tebi.io](https://tebi.io/)

Uses AWS S3 under the hood. We use <code>@aws-sdk</code> to manage resources.
Free Tier + Pay As You Go Limitations:

- 25 GB of data in 2 copies
- 50 GB total storage
- - $0.02 per additional GB stored
- 250 GB of outbound transfer
- - $0.01 per additional GB transferred
- Unlimited uploads

### Deployment

CI/CD with render.com
To build and deply - just push in branch 'main'.
Branch - server.
Host - https://postup24.onrender.com

Note: In oreder to run code Render uses AWS Lambdas under the hood, so you have to wait up to 3 minutes to get data from server for FIRST run only.

## Frontpage

REACT SPA, React Router v6.22

### Deployment

Deployment status [![Netlify Status](https://api.netlify.com/api/v1/badges/de3cb262-c7e4-4eac-8e24-c97d6bf3151b/deploy-status)](https://app.netlify.com/sites/postup24/deploys)
CI/CD with Netlify.
To build and publish - just push in branch 'main'.
Branch - webapp.
Host - https://postup24.netlify.app/
Webhook to trigger deply - https://api.render.com/deploy/srv-cn9m2gf109ks739v0vd0?key=kOvOVl-NR_I

# Telegram API

## How to get chat id (TELEGRAM_CHAT_ID in .env)?

Forward any message from chat to **@JsonDumpBot**.

```
"forward_origin": {
      "type": "channel",
      "chat": {
        "id": -1002143287735,
```

## How to get telegram bot token (TELEGRAM)BOT_TOKEN in .env)?

Open **@BotFather**.

Input command <code>/revoke</code>.

On message: Choose a bot to generate a new token. Warning: your old token will stop working.

DEVELOPMENT

@BisonTeamBot

PRODUCTION

@PostUp24Bot

## How to get user id?

Find bot **@userinfobot**
Push /start
You`ll receive message with Id: ..., First: ..., Last: ..., Lang: ... .

## How to get channel id?

@jsondumpbot or search for JSON Dump Bot on Telegram.
Forward a message from that channel to the **@jsondumpbot** telegram bot.
You should see something like:

```
"forward_from_chat": {
      "id": -1002014566944,
      "title": "Соски венеры",
      "username": "siteup24",
      "type": "channel"
    },
```

Add to .env:
TELEGRAM_CHAT_ID=-1002014566944

## How to get database url (DATABASE_URL in .env)?

Go to https://dashboard.render.com/
Select 'database'
In 'Connections' section copy 'External Database URL'.

## How to get STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY, STORAGE_BUCKET_NAME, STORAGE_ENDPOINT?

Go to https://client.tebi.io/.

Select bucket.

Here you can find STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY, STORAGE_BUCKET_NAME.

Set STORAGE_ENDPOINT to s3.tebi.io.

## How to set FRONTEND_HOST & PORT?

FOR PRODUCTION OR server started localy to get requests from deployed Frontend:

Go to https://app.netlify.com/teams/selub/overview

Select the appropriate site.

      https://postup24.netlify.app

FOR local DEVELOPMENT

http://localhost:5173

## Remove all unnamed docker images.

docker rmi $(docker images -f dangling=true -q)

## Remove all docker images.

docker rmi $(docker image ls)

## Push image to Docker Hub.

docker login

If not possible to login try the code:

```
service docker stop
rm ~/.docker/config.json
service docker start
```

docker tag postup:latest selub/postup:latest

docker push selub/postup:latest

# Winston & Sentry logging

## Server

Add to .env for development:

SENTRY_DSN=https://....ingest.us.sentry.io/4506868529168384
SENTRY_ENV=development

For production

SENTRY_DSN=https://....ingest.us.sentry.io/4506868529168384
SENTRY_ENV=production

## Webapp

Add to .env for development:
VITE_SENTRY_DSN=https://....ingest.us.sentry.io/4507072471891968
VITE_SENTRY_ENV=development

For production
VITE_SENTRY_DSN=https://....ingest.us.sentry.io/4507072471891968
VITE_SENTRY_ENV=production
