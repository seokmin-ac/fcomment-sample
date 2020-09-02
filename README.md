# fcomment-sample

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
   GATSBY_DOMAIN="XXXXXX.auth0.com"
   GATSBY_CLIENT_ID="XXXXXXX"
   GATSBY_AUDIENCE="XXXXXX"
   ```

2. Serve the site for local development.

   ```shell
   npm start
   ```
