import React from 'react'
import Link from 'gatsby-link'

export default () =>
    <header className="header">
        <div className="header__branding">
            <Link className="u-link-unstyled" to="/">Alex Boffey</Link>
        </div>
        <nav className="header__nav">
            <ul className="nav nav--space nav--inline">
                <li><Link to="/work">Work</Link></li>
                <li><Link to="/bio">Bio</Link></li>
            </ul>
        </nav>
    </header>
