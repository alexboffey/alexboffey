import React, { Component } from "react";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";
import PostHead from "../components/post-head";
import PostFooter from "../components/post-footer";

export default class Blog extends Component {
    render() {
        const data = this.props.data;
        const { markdownRemark: post } = data;
        const { previous, next } = this.props.pathContext;

        return (
            <Wrapper>
                <PostHead
                    data={data}
                    post={post}
                    defaultTags="Alex Boffey,Blog"
                />

                <Hero title={post.frontmatter.title} hasBorder />

                <Content>
                    <div className="post-wrapper">
                        <header>
                            <h2 className="subtitle h1">
                                {post.frontmatter.subtitle}
                            </h2>
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
