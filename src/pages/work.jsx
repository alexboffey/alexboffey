import React from 'react'
import Helmet from 'react-helmet'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'
import SingleWork from '../components/single-work' 

export default ({ data }) =>
    <Wrapper>
        <Helmet title={`${data.site.siteMetadata.title} | Work`} />
        
        <Hero title="Work" hasBorder />

        <Content isFullWidth>
            <div className="g-gutter grid">
                {
                    data.allMarkdownRemark.edges.map(post =>
                        <div key={post.node.id} className="g-col-md-6 g-col-xl-4 u-section-sm-bottom">
                            <SingleWork title={post.node.frontmatter.title}
                                subtitle={post.node.frontmatter.subtitle}
                                date={post.node.frontmatter.date}
                                featuredImage={post.node.frontmatter.featured_image}
                                slug={post.node.fields.slug} />
                        </div>
                    )
                }
            </div>
        </Content>
    </Wrapper>

export const query = graphql`
    query WorkQuery {
        allMarkdownRemark(filter: { frontmatter: { post_type: { eq: "work" } } }) {
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
                            featured_image
                        }
                        fields {
                            slug
                        }
                    }
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
