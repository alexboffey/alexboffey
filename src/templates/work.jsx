import React from 'react'
import Helmet from 'react-helmet'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'

export default ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Wrapper>
            <Helmet title={`${data.site.siteMetadata.title} | ${post.frontmatter.title}`} />

            <Hero title={post.frontmatter.title}
                subtitle={post.frontmatter.subtitle}
                hasBorder />

            <Content>
                <div className="post__wrapper">
                    <header className="post__meta">
                        <p className="micro">{post.frontmatter.date}</p>
                    </header>

                    <div className="u-section-xs-top u-section-sm-bottom">
                        <img src={post.frontmatter.featured_image} alt={post.frontmatter.title} />
                    </div>

                    <article className="post u-section-xs" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </Content>
        </Wrapper>
    )
}

export const postQuery = graphql`
    query WorkPostByPath($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                subtitle
                date
                featured_image
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
