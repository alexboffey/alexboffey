import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";
import SingleBlog from "../components/single-blog";

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: { post_type: { eq: "blog" }, published: { eq: "true" } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
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

export default ({ data, location }) => (
  <Layout location={location}>
    <Hero title="Alex Boffey, front end developer." hasBorder />

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
    </Content>
  </Layout>
);
