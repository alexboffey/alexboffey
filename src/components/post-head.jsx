import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const PostHead = ({ data, post, defaultTags }) => (
  <Helmet title={`${data.site.siteMetadata.title} | ${post.frontmatter.title}`}>
    <meta
      name="description"
      content={`${post.frontmatter.title}, ${data.site.siteMetadata.title}.`}
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

PostHead.propTypes = {
  data: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  defaultTags: PropTypes.string
};

export default PostHead;
