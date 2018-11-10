const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` });

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const Blog = path.resolve("src/templates/blog.jsx");
  const Work = path.resolve("src/templates/work.jsx");

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
  `);

  const posts = result.data.allMarkdownRemark.edges;

  createPageByPostType(posts, Work, "work", createPage);
  createPageByPostType(posts, Blog, "blog", createPage);

  return result;
};

/**
 * Helper to create pages by post type
 *
 * @param {Array} posts
 * @param {String} template
 * @param {String} frontmatterString
 * @param {Function} createPage
 * @returns {Null}
 */
function createPageByPostType(posts, template, frontmatterString, createPage) {
  posts
    .filter(
      ({ node }) =>
        node.frontmatter.post_type === frontmatterString &&
        node.frontmatter.published === "true"
    )
    .forEach(({ node }, index, filteredPosts) => {
      const previous =
        index === filteredPosts.length - 1
          ? null
          : filteredPosts[index + 1].node;
      const next = index === 0 ? null : filteredPosts[index - 1].node;

      createPage({
        path: node.fields.slug,
        component: template,
        context: {
          slug: node.fields.slug,
          previous,
          next
        }
      });
    });
}
