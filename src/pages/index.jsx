import React from 'react'
import Link from 'gatsby-link'

import Hero from '../components/hero'
import Excerpt from '../components/excerpt'

export default ({ data }) => {
    return (
        <div className="content__wrapper u-container-lg">
            <Hero title="Alex Boffey, front end developer."
                hasBorder />

            <section className="post__index u-container-lg u-section-xl-bottom">
                {
                    data.allMarkdownRemark.edges.map(post => 
                        <Excerpt key={post.node.id}
                            title={post.node.frontmatter.title}
                            date={post.node.frontmatter.date}
                            excerpt={post.node.excerpt}
                            path={post.node.frontmatter.path} />
                    )
                }
            </section>
        </div>
    )
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark {
            totalCount
                edges {
                    node {
                        id
                        excerpt
                        frontmatter {
                            title
                            path
                            date
                        }
                    }
            }
        }
    }
`
