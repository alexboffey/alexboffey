import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";
import SingleBlog from "../components/single-blog";

export const IndexQuery = graphql`
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

const Index = ({ data, location }) => (
  <Layout location={location}>
    <Wrapper>
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
    </Wrapper>
  </Layout>
);

export default ({ location }) => (
  <StaticQuery
    query={IndexQuery}
    render={data => <Index data={data} location={location} />}
  />
);
