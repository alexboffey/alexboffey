import React from 'react'
import Helmet from 'react-helmet'

import Content from '../layouts/content'
import Hero from '../components/hero'

export default ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <div className="content__wrapper">
            <Helmet title={`${data.site.siteMetadata.title} | ${post.frontmatter.title}`} />

            <Hero title={post.frontmatter.title}
                subtitle={post.frontmatter.subtitle}
                hasBorder />

            <Content>
                <div className="post__wrapper">
                    <article className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </Content>
        </div>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
                subtitle
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
