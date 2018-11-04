import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";
import PostHead from "../components/post-head";
import PostFooter from "../components/post-footer";

class BlogPost extends Component {
  render() {
    const data = this.props.data;
    const { markdownRemark: post } = data;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <PostHead data={data} post={post} defaultTags="Alex Boffey,Blog" />
        <Hero title={post.frontmatter.title} hasBorder />
        <Content>
          <div className="post-wrapper">
            <header>
              <h2 className="subtitle h1">{post.frontmatter.subtitle}</h2>
            </header>

            <section className="post-meta">
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
              title="More blog posts"
            />
          </div>
        </Content>
      </Layout>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "DD-MM-YYYY")
        tags
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
