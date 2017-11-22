const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `posts` })

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators
    const Blog = path.resolve('src/templates/blog.jsx')
    const Work = path.resolve('src/templates/work.jsx')

    return graphql(`{
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
    }`).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.map(({ node }) => {
            let Template = null

            // Select template based on post type
            switch (node.frontmatter.post_type) {
                case "work":
                    Template = Work
                    break

                default:
                    Template = Blog
                    break
            }

            createPage({
                path: node.fields.slug,
                component: Template,
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}
