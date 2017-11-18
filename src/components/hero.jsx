import React from 'react'
import PropTypes from 'prop-types'

const Hero = (props) =>
    <header className="hero">
        <div className={`u-container u-section ${ props.hasBorderBlock ? 'border-block' : ''}`}>
            <h1 className={ props.hasLargeTitle ? 'title title--lg' : 'title' }>
                {props.title}
            </h1>
            <h3 className="subtitle">{props.subtitle}</h3>
        </div>
    </header>

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    hasLargeTitle: PropTypes.bool,
    hasBorderBlock: PropTypes.bool
}

export default Hero
