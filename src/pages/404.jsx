import React from 'react'
import Link from 'gatsby-link'

export default () =>
    <div className="content__wrapper">
        <header className="u-section u-container-sm u-center">
            <h1 className="title title--lg">404...</h1>
            <p className="h4">Unfortunately, this page does not exist!</p>        
            <p>Here's a link back to the <Link to="/">homepage</Link>.</p>
        </header>
    </div>
