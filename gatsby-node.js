const path = require(`path`)
const request = require("request")
const { createFilePath } = require(`gatsby-source-filesystem`)

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
  })

  var options = {
    method: "POST",
    url: `https://${process.env.GATSBY_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      client_id: process.env.GATSBY_API_ID,
      client_secret: process.env.GATSBY_API_SECRET,
      audience: process.env.GATSBY_AUDIENCE,
    },
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    posts.forEach(post => {
      console.log(post.node.fields.slug.replace(/^\/([\w-]+)\/$/, "$1"))
      let options = {
        method: "POST",
        url: `${process.env.GATSBY_API_DOMAIN}/articles`,
        headers: {
          Authorization: `Bearer ${JSON.parse(body).access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: post.node.fields.slug.replace(/^\/([\w-]+)\/$/, "$1"),
        }),
      }
      request(options, (error, response) => {
        if (error) throw new Error(error)
        console.log(response.body)
      })
    })
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
