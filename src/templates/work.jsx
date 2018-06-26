import React, { Component } from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
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
                <meta
                    name="tags"
                    content={
                        post.frontmatter.tags
                            ? post.frontmatter.tags + ",Alex Boffey,Portfolio"
                            : "Alex Boffey,Portfolio"
                    }
                />
            </Helmet>

            <Hero
                title={post.frontmatter.title}
                // subtitle={post.frontmatter.subtitle}
                hasBorder
            />

            <Content>
                <div className="post__wrapper">
                    <header>
                        <h2 className="subtitle h1">
                            {post.frontmatter.subtitle}
                        </h2>
                        <div className="u-section-xs-bottom">
                            <Img
                                sizes={
                                    post.frontmatter.featured_image
                                        .childImageSharp.sizes
                                }
                            />
                        </div>
                    </header>

                    <section className="post__meta">
                        <p className="micro">{post.frontmatter.date}</p>
                    </section>

                    <article
                        className="post u-section-xs"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </div>
            </Content>
        </Wrapper>
    );
};

export const postQuery = graphql`
    query WorkPostByPath($slug: String!) {
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
