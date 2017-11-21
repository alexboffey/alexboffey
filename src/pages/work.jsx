import React from 'react'
import Helmet from 'react-helmet'

import Content from '../layouts/content'
import Hero from '../components/hero'

export default ({ data }) =>
    <div className="content__wrapper">
        <Helmet title={`${data.site.siteMetadata.title} | Work`} />
        
        <Hero title="Work"
            hasBorder />

        <Content></Content>
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
