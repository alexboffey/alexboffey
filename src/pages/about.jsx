import React from 'react'
import Helmet from 'react-helmet'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'

export default ({ data }) =>
    <Wrapper>
        <Helmet title={`${data.site.siteMetadata.title} | About`} />

        <Hero title="About" hasBorder />

        <Content></Content>
    </Wrapper>

export const query = graphql`
    query AboutQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
