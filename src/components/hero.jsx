import PropTypes from "prop-types"
import React from "react"

const Hero = ({ title, subtitle, hasBorder }) => (
  <header className={`hero u-container-lg ${subtitle ? "has-subtitle" : ""}`}>
    <div
      className={`u-container-lg u-center u-section-top ${
        hasBorder ? "border-block" : ""
      }`}
    >
      <h1 className="title title--lander">{title}</h1>
      {subtitle && <h2 className="subtitle h1">{subtitle}</h2>}
    </div>
  </header>
)

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  hasBorder: PropTypes.bool,
}

export default Hero
