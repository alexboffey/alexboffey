const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `posts` });

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};

exports.createPages = async ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;
    const Blog = path.resolve("src/templates/blog.jsx");
    const Work = path.resolve("src/templates/work.jsx");

    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            post_type
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
 * @param posts
 * @param template
 * @param frontmatterString
 * @param createPage
 */
function createPageByPostType(posts, template, frontmatterString, createPage) {
    const filteredPosts = posts.filter(
        ({ node }) => node.frontmatter.post_type === frontmatterString
    );

    filteredPosts.map(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: template,
            context: {
                slug: node.fields.slug
            }
        });
    });
}
