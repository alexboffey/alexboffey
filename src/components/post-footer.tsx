import { Link } from "gatsby"
import React from "react"

import { Tag } from "../style"

interface PostFooterProps {
  previous: any // for now
  next: any // for now
  post: any // for now
  title: string
}

const PostFooter: React.FC<PostFooterProps> = ({
  previous,
  next,
  post,
  title,
}) => (
  <footer className="post-footer card">
    <section>
      <header className="post-footer__header">
        <h3>{title}</h3>
      </header>

      <nav className="post-footer__links">
        {previous && (
          <Link
            className="btn btn--sm btn--ghost"
            to={previous.fields.slug}
            title={previous.fields.slug}
          >
            ←&nbsp;
            {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link
            className="btn btn--sm btn--ghost"
            to={next.fields.slug}
            title={next.fields.slug}
          >
            {next.frontmatter.title}
            &nbsp;→
          </Link>
        )}
      </nav>
    </section>

    {post.frontmatter.tags && (
      <section>
        <header>
          <h3>Tags</h3>
        </header>
        <nav className="post-footer__tags">
          {post.frontmatter.tags.split(",").map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </nav>
      </section>
    )}
  </footer>
)

export default PostFooter
