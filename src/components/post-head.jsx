import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

export default class PostHead extends Component {
  propTypes = {
    data: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    defaultTags: PropTypes.string
  };

  render() {
    const { data, post, defaultTags } = this.props;

    return (
      <Helmet
        title={`${data.site.siteMetadata.title} | ${post.frontmatter.title}`}
      >
        <meta
          name="description"
          content={`${post.frontmatter.title}, ${
            data.site.siteMetadata.title
          }.`}
        />
        <meta
          name="tags"
          content={
            post.frontmatter.tags
              ? post.frontmatter.tags + `,${defaultTags}`
              : defaultTags
          }
        />
      </Helmet>
    );
  }
}
