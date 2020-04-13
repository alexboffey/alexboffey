import PropTypes from "prop-types"
import React from "react"

import { ReactComponent as Codepen } from "../img/vector/social/codepen.svg"
import { ReactComponent as Github } from "../img/vector/social/github.svg"
import { ReactComponent as LinkedIn } from "../img/vector/social/linkedin.svg"
import { ReactComponent as Twitter } from "../img/vector/social/twitter.svg"

const Social = (
  <span>
    <a
      title="Twitter"
      href="https://www.twitter.com/alexboffey/"
      target="_blank"
      rel="noopener noreferrer"
      className="icon icon--hover"
    >
      <Twitter />
    </a>
    <a
      title="LinkedIn"
      href="https://www.linkedin.com/in/alexboffey/"
      target="_blank"
      rel="noopener noreferrer"
      className="icon icon--hover"
    >
      <LinkedIn />
    </a>
  </span>
)

const SocialIcons = ({ hasSocials }) => {
  const socials = hasSocials ? Social : ""

  return (
    <div className="social-icons">
      {socials}
      <a
        title="Github"
        href="https://www.github.com/alexboffey"
        target="_blank"
        rel="noopener noreferrer"
        className="icon icon--hover"
      >
        <Github />
      </a>
      <a
        title="Codepen"
        href="https://www.codepen.io/alexboffey"
        target="_blank"
        rel="noopener noreferrer"
        className="icon icon--hover"
      >
        <Codepen />
      </a>
    </div>
  )
}

SocialIcons.propTypes = {
  hasSocials: PropTypes.bool,
}

export default SocialIcons
