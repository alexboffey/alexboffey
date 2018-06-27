import React, { Component } from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

export default class PostFooter extends Component {
    propTypes = {
        previous: PropTypes.object,
        next: PropTypes.object,
        post: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
    }

    render() {
        const { previous, next, post, title } = this.props;

        return (
            <footer className="post-footer card">
                <section>
                    <header className="post-footer__header">
                        <h3>{ title }</h3>
                    </header>

                    <nav className="post-footer__links">
                        {previous && (
                            <Link
                                className="btn btn--sm btn--ghost"
                                to={previous.fields.slug}
                                title={previous.fields.slug}
                            >
                                ←&nbsp;{previous.frontmatter.title}
                            </Link>
                        )}
                        {next && (
                            <Link
                                className="btn btn--sm btn--ghost"
                                to={next.fields.slug}
                                title={next.fields.slug}
                            >
                                {next.frontmatter.title}&nbsp;→
                            </Link>
                        )}
                    </nav>
                </section>

                {post.frontmatter.tags && (
                    <section>
                        <header>
                            <h3>Tags:</h3>
                        </header>
                        <nav className="post-footer__tags">
                            {post.frontmatter.tags.split(",").map(tag => (
                                <span
                                    key={tag}
                                    className="btn btn--ghost btn--sm"
                                    style={{ cursor: "default" }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </nav>
                    </section>
                )}
            </footer>
        );
    }
}
