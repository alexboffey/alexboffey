import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const SingleWork = ({ title, subtitle, date, featuredImage, slug }) =>
    <article className="work u-block g-col-md-6">
        <Link to={slug} className="u-link-unstyled">
            <img src={featuredImage} alt={`${title} featured image`} />
        </Link>

        <section className="u-section-xs work__meta">
            <h2 className="h1">{title}</h2>
            <p>{subtitle}</p>
        </section>

        <footer className="work__footer u-section-xs u-section-sm-bottom">
            <Link className="btn btn--ghost" to={slug}>View Project</Link>
        </footer>
    </article>

SingleWork.propTypes = {
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired
}

export default SingleWork
