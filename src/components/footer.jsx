import React from "react"

import Icons from "./icons"

const Footer = () => (
  <footer className="footer page-footer">
    <div className="u-container u-center u-section-sm u-text-center">
      <div className="u-section-xs">
        <Icons hasSocials />
      </div>

      <footer className="u-section-xs">
        <p className="micro footer__copy">
          &copy; {new Date().getFullYear()} Alex Boffey.
        </p>
      </footer>
    </div>
  </footer>
)

export default Footer
