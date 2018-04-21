import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Icons from "./icons";
import logo from "../img/logo/logo.svg";

const NavLink = ({ to, activePath, children }) => {
    let linkClass = "";

    // Messy logic to determine active path
    if (to === "/") {
        if (
            activePath === to ||
            activePath === `${__PATH_PREFIX__}${to}` ||
            activePath.includes("/blog")
        ) {
            linkClass = "is-active";
        }
    } else if (to === "/work") {
        if (activePath.includes("/work")) {
            linkClass = "is-active";
        }
    } else if (to === "/about") {
        if (activePath.includes("/about")) {
            linkClass = "is-active";
        }
    }

    return (
        <Link className={linkClass} to={to}>
            {children}
        </Link>
    );
};

const Header = ({ activePath }) => {
    return (
        <header className="header__wrapper">
            <div className="header header--edges u-container">
                <div className="header__branding">
                    <Link className="u-link-unstyled" to="/">
                        <span className="u-visually-hidden">Alex Boffey</span>
                        <img
                            className="header__logo"
                            src={logo}
                            alt="Logo"
                            title="A link to the homepage."
                        />
                    </Link>
                </div>
                <nav className="header__nav">
                    <ul className="nav nav--pills nav--inline">
                        <li>
                            <NavLink to="/" activePath={activePath}>
                                Blog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/work" activePath={activePath}>
                                Work
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activePath={activePath}>
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
    );
};

Header.propTypes = {
    activePath: PropTypes.string.isRequired
};

export default Header;
