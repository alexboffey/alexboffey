import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const Excerpt = (props) =>
    <article className="excerpt">

            <header className="u-section-xs border-block border-block--alt">
                <h2 className="h1">{props.title}</h2>
                <p>{props.date}</p>
            </header>

            <div className="u-section-xs">
                <div className="grid">
                    <div className="g-col-sm-10">
                        <div className="u-section-xs-bottom">
                            <p>{props.excerpt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="u-section-xs u-section-sm-bottom">
                <Link className="btn btn--ghost" to={props.path}>Read more</Link>
            </footer>

    </article>

Excerpt.propTypes = {
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

export default Excerpt
