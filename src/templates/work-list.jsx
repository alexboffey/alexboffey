import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Content from "../components/content"
import Hero from "../components/hero"
import Layout from "../components/layout"
import ListPagination from "../components/list-pagination"
import SingleWork from "../components/single-work"

const WorkPage = ({ data, location, pageContext }) => (
  <Layout location={location}>
    <Helmet title={`${data.site.siteMetadata.title} | Work`} />
    <Hero title="Work" hasBorder />
    <Content isFullWidth>
      <div className="g-gutter grid">
        {data.allMarkdownRemark.edges.map((post) => (
          <div
            key={post.node.id}
            className="g-col-md-6 g-col-xl-4 u-section-sm-bottom"
          >
            <SingleWork
              title={post.node.frontmatter.title}
              subtitle={post.node.frontmatter.subtitle}
              thumb={post.node.frontmatter.thumb.childImageSharp.sizes}
              slug={post.node.fields.slug}
            />
          </div>
        ))}
        <div className="g-col-md-10 g-col-xl-8">
          <ListPagination
            numberOfPages={pageContext.numberOfPages}
            currentPage={pageContext.currentPage}
            path="/work/"
          />
        </div>
      </div>
    </Content>
  </Layout>
)

WorkPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default WorkPage

export const pageQuery = graphql`
  query WorkListQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { post_type: { eq: "work" }, published: { eq: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
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
            thumb {
              childImageSharp {
                sizes(maxWidth: 650, quality: 75) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
            published
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
