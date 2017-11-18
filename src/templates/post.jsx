import React from 'react'
import Helmet from 'react-helmet'

import Hero from '../components/hero'

export default ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <section className="post u-container-lg">
            <Helmet title={`Alex Boffey | ${post.frontmatter.title}`} />

            <header className="post__meta">
                <Hero title={post.frontmatter.title} subtitle={post.frontmatter.subtitle} />
            </header>

            <div className="grid u-container-lg">
                <div className="g-col-md-10">
                    <article className="post__content" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </div>

        </section>
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
    }
`
