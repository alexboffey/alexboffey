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

            <Content isFullWidth>
                {
                    data.allMarkdownRemark.edges.map(post =>
                        <div className="grid g-col-md-10 g-col-xl-8">
                            <SingleBlog key={post.node.id}
                                title={post.node.frontmatter.title}
                                subtitle={post.node.frontmatter.subtitle}
                                date={post.node.frontmatter.date}
                                excerpt={post.node.excerpt}
                                slug={post.node.fields.slug} />
                        </div>
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
                            subtitle
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
