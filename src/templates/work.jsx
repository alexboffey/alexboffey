import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";
import PostHead from "../components/post-head";
import PostFooter from "../components/post-footer";

class WorkPost extends Component {
  render() {
    const data = this.props.data;
    const { markdownRemark: post } = data;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <PostHead
          data={data}
          post={post}
          defaultTags="Alex Boffey,Work,Portfolio"
        />

        <Hero title={post.frontmatter.title} hasBorder />

        <Content>
          <div className="post__wrapper">
            <header>
              <h2 className="subtitle h1">{post.frontmatter.subtitle}</h2>
              <div className="u-section-xs-bottom">
                <Img
                  sizes={post.frontmatter.featured_image.childImageSharp.sizes}
                />
              </div>
            </header>

            <section className="post__meta">
              <p className="micro">{post.frontmatter.date}</p>
            </section>

            <article
              className="post"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <PostFooter
              previous={previous}
              next={next}
              post={post}
              title="More work"
            />
          </div>
        </Content>
      </Layout>
    );
  }
}

WorkPost.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default WorkPost;

export const pageQuery = graphql`
  query WorkPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "DD-MM-YYYY")
        tags
        featured_image {
          childImageSharp {
            sizes(maxWidth: 820, quality: 75) {
              ...GatsbyImageSharpSizes_noBase64
            }
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
