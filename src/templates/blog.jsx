import React, { Component } from "react";
import Helmet from "react-helmet";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";
import Link from "gatsby-link";

export default class Blog extends Component {
    render() {
        const data = this.props.data;
        const { markdownRemark: post } = data;
        const { previous, next } = this.props.pathContext;

        return (
            <Wrapper>
                <Helmet
                    title={`${data.site.siteMetadata.title} | ${
                        post.frontmatter.title
                    }`}
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
                                ? post.frontmatter.tags + ",Alex Boffey,Blog"
                                : "Alex Boffey,Blog"
                        }
                    />
                </Helmet>

                <Hero title={post.frontmatter.title} hasBorder />

                <Content>
                    <div className="post__wrapper">
                        <header>
                            <h2 className="subtitle h1">
                                {post.frontmatter.subtitle}
                            </h2>
                        </header>

                        <section className="post__meta">
                            <p className="micro">{post.frontmatter.date}</p>
                        </section>

                        <article
                            className="post"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />

                        <footer className="post__footer">
                            <header className="post__footer__header">
                                <h3 className="h2">More blog posts:</h3>
                            </header>

                            <nav className="post__footer__links">
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
                        </footer>
                    </div>
                </Content>
            </Wrapper>
        );
    }
}

export const postQuery = graphql`
    query BlogPostByPath($slug: String!) {
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
