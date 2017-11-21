import React from 'react'
import Link from 'gatsby-link'

import Content from '../layouts/content'
import Hero from '../components/hero'
import Excerpt from '../components/excerpt'

export default ({ data }) => {
    return (
        <div className="content__wrapper">
            <Hero title="Alex Boffey, front end developer."
                hasBorder />

            <Content>
                    {
                        data.allMarkdownRemark.edges.map(post =>
                            <Excerpt key={post.node.id}
                                title={post.node.frontmatter.title}
                                date={post.node.frontmatter.date}
                                excerpt={post.node.excerpt}
                                path={post.node.frontmatter.path} />
                        )
                    }
            </Content>
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
