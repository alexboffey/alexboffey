import React from 'react'
import Link from 'gatsby-link'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'
import SingleBlog from '../components/single-blog'

export default ({ data }) => {
    return (
        <Wrapper>
            <Hero title="Alex Boffey, front end developer."
                hasBorder />

            <Content>
                {
                    data.allMarkdownRemark.edges.map(post =>
                        <SingleBlog key={post.node.id}
                            title={post.node.frontmatter.title}
                            date={post.node.frontmatter.date}
                            excerpt={post.node.excerpt}
                            slug={post.node.fields.slug} />
                    )
                }
            </Content>
        </Wrapper>
    )
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark(filter: { frontmatter: { post_type: { eq: "blog" } } }) {
            totalCount
                edges {
                    node {
                        id
                        excerpt
                        frontmatter {
                            title
                            date
                            post_type
                        }
                        fields {
                            slug
                        }
                    }
            }
        }
    }
`
