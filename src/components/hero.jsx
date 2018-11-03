import React from "react";
import PropTypes from "prop-types";

const Hero = ({ title, subtitle, hasBorder }) => {
  const subtitleElement = subtitle ? (
    <h2 className="subtitle h1">{subtitle}</h2>
  ) : (
    ""
  );
  const borderBlock = hasBorder ? "border-block" : "";
  const heroClass = `hero u-container-lg ${subtitle ? "has-subtitle" : ""}`;

  return (
    <header className={heroClass}>
      <div className={`u-container-lg u-center u-section-top ${borderBlock}`}>
        <h1 className="title title--lander">{title}</h1>

        {subtitleElement}
      </div>
    </header>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  hasBorder: PropTypes.bool
};

export default Hero;
