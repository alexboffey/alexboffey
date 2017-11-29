import React from 'react'
import Link from 'gatsby-link'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'
import SingleBlog from '../components/single-blog'

export default ({ data }) => {
    return (
        <Wrapper>
            <Hero title="Alex Boffey, front end developer." hasBorder />

            <Content isFullWidth>
                <div className="grid">
                    {
                        data.allMarkdownRemark.edges.map(post =>
                            <div key={post.node.id} className="g-col-md-10 g-col-xl-8 u-section-sm-bottom">
                                <SingleBlog title={post.node.frontmatter.title}
                                    subtitle={post.node.frontmatter.subtitle}
                                    date={post.node.frontmatter.date}
                                    excerpt={post.node.excerpt}
                                    slug={post.node.fields.slug} />
                            </div>
                        )
                    }
                </div>
            </Content>
        </Wrapper>
    )
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    post_type: { eq: "blog" },
                    published: { eq: "true" }
                } 
            }
            sort: {
                order: DESC,
                fields: [ frontmatter___date ]
            }
        ) {
            totalCount
                edges {
                    node {
                        id
                        excerpt
                        frontmatter {
                            title
                            subtitle
                            date(formatString: "DD-MM-YYYY")
                            post_type
                            published
                        }
                        fields {
                            slug
                        }
                    }
            }
        }
    }
`
