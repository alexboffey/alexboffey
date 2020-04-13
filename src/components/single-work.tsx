import { Link } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"

interface SingleWorkProps {
  slug: string
  title: string
  subtitle: string
  thumb: FluidObject
}

const SingleWork: React.FC<SingleWorkProps> = ({
  title,
  subtitle,
  slug,
  thumb,
}) => (
  <article className="work__single card u-block-xl u-section-sm-bottom">
    <header className="work__header u-section-xs-bottom">
      <Link to={slug} className="u-link-unstyled">
        <Img sizes={thumb} alt={`An image of the ${title} project.`} />
      </Link>
    </header>

    <section className="work__content u-section-xs">
      <Link to={slug} className="u-link-unstyled">
        <h2 className="h1">{title}</h2>
      </Link>
      <p>{subtitle}</p>
    </section>

    <footer className="work__footer u-section-xs-top">
      <Link className="btn btn--ghost" to={slug}>
        View Project
      </Link>
    </footer>
  </article>
)

export default SingleWork
