import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../img/logo/logo.svg"
import Icons from "./icons"

// Helper function to conditionally apply active class
function isLinkActive(to, pathName) {
  if (to === "/" && (pathName === to || pathName.includes("/blog"))) {
    return true
  } else if (to === "/work" && pathName.includes("/work")) {
    return true
  } else if (to === "/about" && pathName.includes("/about")) {
    return true
  }
  return false
}

const NavLink = ({ to, pathName, children }) => (
  <Link className={isLinkActive(to, pathName) ? "is-active" : ""} to={to}>
    {children}
  </Link>
)

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const Header = ({ pathName }) => (
  <header className="header__wrapper">
    <div className="header header--edges u-container">
      <div className="header__branding">
        <Link className="u-link-unstyled" to="/">
          <span className="u-visually-hidden">Alex Boffey</span>
          <img
            className="header__logo"
            src={Logo}
            alt="Logo"
            title="A link to the homepage."
          />
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="nav nav--pills nav--inline">
          <li>
            <NavLink to="/" pathName={pathName}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/work" pathName={pathName}>
              Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" pathName={pathName}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer className="u-hidden-xs u-hidden-sm u-hidden-md u-section-xs-bottom">
        <Icons />
      </footer>
    </div>
  </header>
)

Header.propTypes = {
  pathName: PropTypes.string.isRequired,
}

export default Header
