import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'

import Favicon from '../img/logo/favicon.png'

import '../scss/app.scss'

export default ({ children, data, location }) => {
    return (
        <div className="page__wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data.site.siteMetadata.title}</title>
                <link rel="shortcut icon" href={Favicon} />
                <html lang="en" />
            </Helmet>

            <Header activePath={location.pathname} />

            <main className="page__main">
                {children()}

                <Footer />
            </main>
        </div>
    )
}
export const query = graphql`
    query LayoutQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
