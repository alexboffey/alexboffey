import React from 'react'
import PropTypes from 'prop-types'

const Hero = (props) => {
    const subtitle = props.subtitle ? <h3 className="subtitle">{props.subtitle}</h3> : ''
    const borderBlock = props.hasBorder ? 'border-block' : ''
    const isLanderTitle = props.isLanderTitle ? 'title--lander': ''
    const heroClass = `hero ${props.subtitle ? 'has-subtitle' : ''}`

    return (
        <header className={heroClass}>
            <div className={`u-container u-section-top u-section-sm-bottom ${borderBlock}`}>
                <h1 className={`title ${isLanderTitle}`}>
                    {props.title}
                </h1>

                {subtitle}
            </div>
        </header>
    )
}

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    hasLargeTitle: PropTypes.bool,
    hasBorderBlock: PropTypes.bool
}

export default Hero
