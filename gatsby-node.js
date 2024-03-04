const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/blog-post.jsx`)

  return await graphql(
    `
      {
        allMdx(
            filter: {
                frontmatter: { category: { ne: null }, draft: { eq: false } }
            }
            sort: { frontmatter: { date: DESC } }
            limit: 1000
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        category
                        date(formatString: "MMMM DD, YYYY")
                        slug
                    }
                    internal {
                        contentFilePath
                    }
                }
                previous {
                    frontmatter {
                        title
                        slug
                    }
                }
                next {
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.edges
    posts.forEach(post => {
      createPage({
        path: post.node.frontmatter.slug,
        component: `${postTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
        context: {
          mdx: post.node,
          slug: post.node.frontmatter.slug,
          previous: post.next,
          next: post.previous
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if ( node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}