import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Content from "../components/content"
import Hero from "../components/hero"
import Layout from "../components/layout"
import ListPagination from "../components/list-pagination"
import SingleBlog from "../components/single-blog"

const IndexPage = ({ data, location, pageContext }) => (
  <Layout location={location}>
    <Hero title="Alex Boffey, JavaScript developer" hasBorder />
    <Content isFullWidth>
      <div className="grid">
        {data.allMarkdownRemark.edges.map((post) => (
          <div
            key={post.node.id}
            className="g-col-md-10 g-col-xl-8 u-section-sm-bottom"
          >
            <SingleBlog
              title={post.node.frontmatter.title}
              subtitle={post.node.frontmatter.subtitle}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              slug={post.node.fields.slug}
            />
          </div>
        ))}
        <div className="g-col-md-10 g-col-xl-8">
          <ListPagination
            currentPage={pageContext.currentPage}
            numberOfPages={pageContext.numberOfPages}
            path="/blog/"
            blog
          />
        </div>
      </div>
    </Content>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query BlogListQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { post_type: { eq: "blog" }, published: { eq: true } }
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
