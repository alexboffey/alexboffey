import React from 'react'
import Helmet from 'react-helmet'

import Hero from '../components/hero'

export default ({ data }) =>
    <div className="content__wrapper u-container-lg">
        <Helmet title={`${data.site.siteMetadata.title} | Work`} />
        
        <Hero title="Work"
            hasBorder />
    </div>

export const query = graphql`
    query WorkQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
