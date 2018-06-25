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

    posts.map(({ node }, index) => {
        let Template = null;

        // Select template based on post type
        switch (node.frontmatter.post_type) {
            case "work":
                Template = Work;
                break;

            default:
                Template = Blog;
                break;
        }

        createPage({
            path: node.fields.slug,
            component: Template,
            context: {
                slug: node.fields.slug
            }
        });
    });

    return result;
};
