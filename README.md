# PostUp Telegram auto-posting application

## Server

Moleculer, PostgreSQL,
REST API

### Database

Database is exposed by Render.
Region: Frankfurt (EU Central)
Instance Type: Free RAM:256MB CPU:100m Storage: 1 GB

**IMPORTANT!**. Your database will expire on May 8, 2024. The database will be deleted unless you upgrade to a paid instance type.

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
