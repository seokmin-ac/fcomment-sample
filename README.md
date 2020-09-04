# fcomment-sample

[![Netlify Status](https://api.netlify.com/api/v1/badges/03c6b834-d4f6-4381-9ce8-73b4eac54a04/deploy-status)](https://app.netlify.com/sites/fcomment-sample/deploys)

This blog is just a fork project of [gatsby-blog-starter](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog). Some authorization logics are implemented for showing how fcomment works.

## Installation

```shell
npm install
```

## Prerequisites

- [Auth0](https://auth0.com/) application and API
- Deployed [fcomment](https://github.com/seokmin-ac/fcomment) project

## Local Development

1. Create `.env` file to root directory. This project needs environment variables. Local env variables are provided by `.env` file with `node-env-run` package.

   ```
   # .env
   AUTH0_DOMAIN="XXXXXX.auth0.com"
   AUTH0_CLIENT_ID="XXXXXXX"
   AUTH0_AUDIENCE="XXXXXX"
   ```

2. Serve the site for local development.

   ```shell
   npm start
   ```

## Netlify Deployment

You need to define environment variables for Netlify.
