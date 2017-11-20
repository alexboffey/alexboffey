import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo/logo-main.png'

import instagram from '../img/vector/social/instagram.svg'
import linkedin from '../img/vector/social/linkedin.svg'
import twitter from '../img/vector/social/twitter.svg'

const year = (new Date).getFullYear()

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
                <ul className="nav nav--inline">
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/work">Work</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <span className="u-hidden-xs u-hidden-sm u-hidden-md flex__balancer"></span>
        </div>
    </header>

export default Header
