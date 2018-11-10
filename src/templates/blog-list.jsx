import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";
import SingleBlog from "../components/single-blog";
import ListPagination from "../components/list-pagination";

const IndexPage = ({ data, location, pathContext }) => (
  <Layout location={location}>
    <Hero title="Blog" hasBorder />
    <Content isFullWidth>
      <div className="grid">
        {data.allMarkdownRemark.edges.map(post => (
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
      </div>
      <ListPagination
        currentPage={pathContext.currentPage}
        numberOfPages={pathContext.numberOfPages}
        path="/blog/"
      />
    </Content>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default IndexPage;

export const pageQuery = graphql`
  query BlogListQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { post_type: { eq: "blog" }, published: { eq: "true" } }
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
`;
