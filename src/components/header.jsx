import React from 'react'
import Link from 'gatsby-link'

import Icons from './icons'

import logo from '../img/logo/logo-main.png'

const Header = () =>
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
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/work">Work</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <footer className="u-hidden-xs u-hidden-sm u-hidden-md u-section-xs-bottom">
                <Icons />
            </footer>
        </div>
    </header>

export default Header
