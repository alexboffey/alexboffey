import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const SingleBlog = ({ title, date, excerpt, slug }) =>
    <article className="excerpt">
        <header className="u-section-xs border-block border-block--alt">
            <h2 className="h1">{title}</h2>
            <p>{date}</p>
        </header>

        <div className="u-section-xs">
            <div className="grid">
                <div className="g-col-sm-10">
                    <div className="u-section-xs-bottom">
                        <p>{excerpt}</p>
                    </div>
                </div>
            </div>
        </div>

        <footer className="u-section-xs u-section-sm-bottom">
            <Link className="btn btn--ghost" to={slug}>Read more</Link>
        </footer>
    </article>

SingleBlog.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired
}

export default SingleBlog
