import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { BlogHeader } from "../style";

const SingleBlog = ({ title, excerpt, slug, date }) => (
  <article className="blog-single card u-section-sm-bottom u-block-xl">
    <header className="blog-single__header border-block border-block--alt">
      <Link className="u-link-unstyled" to={slug}>
        <BlogHeader className="h1">{title}</BlogHeader>
      </Link>
      <p className="micro">{date}</p>
    </header>

    <div className="blog-single__content u-section-xxs-top">
      <div className="grid">
        <div className="g-col-sm-10">
          <p>{excerpt}</p>
        </div>
      </div>
    </div>

    <footer className="blog-single__footer u-section-xs-top">
      <Link className="btn btn--ghost" to={slug}>
        Read more
      </Link>
    </footer>
  </article>
);

SingleBlog.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default SingleBlog;
