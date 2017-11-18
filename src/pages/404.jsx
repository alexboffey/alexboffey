import React from 'react'
import Link from 'gatsby-link'

import Hero from '../components/hero'

export default () =>
    <div className="content__wrapper u-container-lg">
        <Hero title="404" subtitle="Unfortunately, this page does not exist!" hasLargeTitle />
        <article className="u-container">
            <p>Here's a link back to the <Link to="/">homepage</Link>.</p>
        </article>
    </div>
