import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const SingleWork = ({ title, subtitle, slug, thumb }) => (
    <article className="work__single card u-block-xl u-section-sm-bottom">
        <header className="work__header u-section-xs-bottom">
            <Link to={slug} className="u-link-unstyled">
                <img
                    src={__PATH_PREFIX__ + thumb}
                    alt={`An image of the ${title} project.`}
                />
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
);

SingleWork.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired
};

export default SingleWork;
