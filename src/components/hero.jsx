import React from 'react'
import PropTypes from 'prop-types'

const Hero = (props) => {
    const subtitle = props.subtitle ? <h3 className="subtitle">{props.subtitle}</h3> : ''
    const borderBlock = props.hasBorder ? 'border-block' : ''
    const heroClass = `hero u-container-lg ${props.subtitle ? 'has-subtitle' : ''}`

    return (
        <header className={heroClass}>
            <div className={`u-container u-section-top u-section-sm-bottom ${borderBlock}`}>
                <h1 className='title title--lander'>
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
    hasBorderBlock: PropTypes.bool
}

export default Hero
