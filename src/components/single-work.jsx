import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const SingleWork = ({ title, subtitle, date, featuredImage, slug }) =>
    <article className="work__single card u-block-xl">
        <header className="work__header u-section-xs-bottom">
            <Link to={slug} className="u-link-unstyled">
                <img src={__PATH_PREFIX__ + featuredImage} alt={`${title} featured image`} />
            </Link>
        </header>

        <section className="work__content u-section-xs">
            <h3 className="h1">{title}</h3>
            <p>{subtitle}</p>
        </section>

        <footer className="work__footer u-section-xs-top">
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
