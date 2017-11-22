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
                    <header className="post__meta u-section-xs-bottom">
                        <p className="micro">{post.frontmatter.date}</p>
                    </header>

                    <article className="post" dangerouslySetInnerHTML={{ __html: post.html }} />

                    <div className="u-section"></div>
                </div>
            </Content>
        </Wrapper>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                subtitle
                date
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
