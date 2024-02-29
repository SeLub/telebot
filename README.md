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

CI/CD with Netlify.
To build and publish - just push in branch 'main'.
Branch - webapp.
Host - https://postup24.netlify.app/

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
input: @BisonTeamBot

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

FOR local development
http://localhost:5173
