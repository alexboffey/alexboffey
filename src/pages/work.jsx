import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";
import SingleWork from "../components/single-work";

const WorkQuery = graphql`
  query WorkQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: { post_type: { eq: "work" }, published: { eq: "true" } }
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
`;

const Work = ({ data, location }) => (
  <Layout location={location}>
    <Wrapper>
      <Helmet title={`${data.site.siteMetadata.title} | Work`} />

      <Hero title="Work" hasBorder />

      <Content isFullWidth>
        <div className="g-gutter grid">
          {data.allMarkdownRemark.edges.map(post => (
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
        </div>
      </Content>
    </Wrapper>
  </Layout>
);

export default ({ location }) => (
  <StaticQuery
    query={WorkQuery}
    render={data => <Work data={data} location={location} />}
  />
);
