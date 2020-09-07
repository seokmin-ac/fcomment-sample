const path = require(`path`)
const got = require(`got`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Get JWT from Authorization servece.
const getToken = async () => {
  const { body } = await got.post(
    `https://${process.env.GATSBY_DOMAIN}/oauth/token`,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
        client_id: process.env.GATSBY_API_ID,
        client_secret: process.env.GATSBY_API_SECRET,
        audience: process.env.GATSBY_AUDIENCE,
      },
    }
  )
  if (process.env.NODE_ENV === "development") {
    console.log(`New Access token is assigned:\n${body.access_token}`)
  }
  return body.access_token
}

// Post an article.
const postArticle = (post, token) =>
  got.post(`${process.env.GATSBY_API_DOMAIN}/articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: post.node.fields.slug.replace(/^\/([\w-]+)\/$/, "$1"),
    }),
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  let token = process.env.GATSBY_ACCESS_TOKEN ?? ""
  // Check is the token valid.
  await got
    .post(`${process.env.GATSBY_API_DOMAIN}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(async reason => {
      if (reason.response.statusCode === 401) {
        token = await getToken()
        return
      }
      throw reason
    })

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
    postArticle(post, token)
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
