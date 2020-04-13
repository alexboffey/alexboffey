const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const Blog = path.resolve("src/templates/blog.jsx")
  const Work = path.resolve("src/templates/work.jsx")
  const BlogList = path.resolve("src/templates/blog-list.jsx")
  const WorkList = path.resolve("src/templates/work-list.jsx")

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            html
            id
            fields {
              slug
            }
            frontmatter {
              post_type
              title
              published
              date(formatString: "DD-MM-YYYY")
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  createPageByPostType(posts, Work, "work", createPage, WorkList, "/work", 6)
  createPageByPostType(posts, Blog, "blog", createPage, BlogList, "/blog", 4)

  return result
}

/**
 * Helper to create pages by post type
 *
 * @param {Array} posts
 * @param {String} postTemplate
 * @param {String} frontmatterString
 * @param {Function} createPage
 * @param {String} listTemplate
 * @param {String} listPagePath
 * @param {Number} postsPerPage
 * @returns {Null}
 */
function createPageByPostType(
  posts,
  postTemplate,
  frontmatterString,
  createPage,
  listTemplate,
  listPagePath,
  postsPerPage = 4,
) {
  posts
    .filter(
      ({ node }) =>
        node.frontmatter.post_type === frontmatterString &&
        node.frontmatter.published,
    )
    .forEach(({ node }, index, filteredPosts) => {
      // Create blog / work post pages
      const previous =
        index === filteredPosts.length - 1
          ? null
          : filteredPosts[index + 1].node
      const next = index === 0 ? null : filteredPosts[index - 1].node
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {
          slug: node.fields.slug,
          previous,
          next,
        },
      })

      // Create paginated list pages
      const numberOfPages = Math.ceil(filteredPosts.length / postsPerPage)
      Array.from({ length: numberOfPages }).forEach((el, index) => {
        let path

        if (listPagePath === "/blog") {
          path = index === 0 ? `/` : `${listPagePath}/${index + 1}`
        } else {
          path =
            index === 0 ? `${listPagePath}` : `${listPagePath}/${index + 1}`
        }

        createPage({
          path,
          component: listTemplate,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            numberOfPages,
            currentPage: index + 1,
          },
        })
      })
    })
}
