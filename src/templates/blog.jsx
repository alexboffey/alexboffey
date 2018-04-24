import React from "react";
import Helmet from "react-helmet";

import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";

import Hero from "../components/hero";

export default ({ data }) => {
    const { markdownRemark: post } = data;

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
            </Helmet>

            <Hero
                title={post.frontmatter.title}
                // subtitle={post.frontmatter.subtitle}
                hasBorder
            />

            <Content>
                <div className="post__wrapper">
                    <header className="u-section-bottom">
                        <h2 className="subtitle h1">
                            {post.frontmatter.subtitle}
                        </h2>
                        {post.frontmatter.featured_image && ( // Inline Conditional!
                            <img
                                src={
                                    __PATH_PREFIX__ +
                                    post.frontmatter.featured_image
                                }
                                alt={`An image of the ${
                                    post.frontmatter.title
                                } project.`}
                            />
                        )}
                    </header>

                    <section className="post__meta">
                        <p className="micro">{post.frontmatter.date}</p>
                    </section>

                    <article
                        className="post"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </div>
            </Content>
        </Wrapper>
    );
};

export const postQuery = graphql`
    query BlogPostByPath($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                subtitle
                date(formatString: "DD-MM-YYYY")
                featured_image
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;
