import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const Excerpt = (props) =>
    <article className="post--excerpt u-section-sm">
        <header className="u-section-xs">
            <h2 className="h2">{props.title}</h2>
            <small className="micro">{props.date}</small>
        </header>

        <div className="u-section-xs">
            <div className="grid">
                <div className="g-col-sm-10">
                    <p className="u-block u-fill-neutral-lightest">{props.excerpt}</p>
                </div>
            </div>
        </div>

        <footer className="u-section-xs">
            <Link to={props.path}>Read More</Link>
        </footer>
    </article>

Excerpt.propTypes = {
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

export default Excerpt
