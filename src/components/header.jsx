import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Icons from './icons'

import logo from '../img/logo/logo-main.png'

const LinkWrapper = ({ children, to, activePath }) => {
    let linkClass = activePath.includes(to) ? 'is-active' : ''

    if (to === '/' && activePath !== '/') {
        linkClass = ''
    }

    return (
        <Link to={to} className={linkClass}>{children}</Link>
    )
}

const Header = ({ activePath }) => {
    
    return (
        <header className="header__wrapper">
            <div className="header header--edges u-container">
                <div className="header__branding">
                    <Link className="u-link-unstyled" to="/">
                        <span className="u-visually-hidden">
                            Alex Boffey
                    </span>
                        <img className="header__logo" src={logo} alt="Logo" title="A link to the homepage." />
                    </Link>
                </div>
                <nav className="header__nav">
                    <ul className="nav nav--pills nav--inline">
                        <li><LinkWrapper to="/" activePath={activePath}>Blog</LinkWrapper></li>
                        <li><LinkWrapper to="/work" activePath={activePath}>Work</LinkWrapper></li>
                        <li><LinkWrapper to="/about" activePath={activePath}>About</LinkWrapper></li>
                    </ul>
                </nav>
                <footer className="u-hidden-xs u-hidden-sm u-hidden-md u-section-xs-bottom">
                    <Icons />
                </footer>
            </div>
        </header>
    )
}

Header.propTypes = {
    activePath: PropTypes.string.isRequired
}


export default Header
