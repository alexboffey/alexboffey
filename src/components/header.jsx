import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo/logo-main.png'

export default () =>
    <header className="header__wrapper">
        <div className="u-container">
            <div className="header header--edges">
                <div className="header__branding">
                    <Link className="u-link-unstyled" to="/">
                        <span className="u-visually-hidden">
                            Alex Boffey
                        </span>
                        <img className="header__logo" src={logo} alt="Logo" title="A link to the homepage." />
                    </Link>
                </div>
                <nav className="header__nav">
                    <ul className="nav nav--space nav--inline">
                        <li><Link to="/work">Work</Link></li>
                        <li><Link to="/bio">Bio</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
