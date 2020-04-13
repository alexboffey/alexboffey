import "../scss/app.scss"

import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Favicon from "../img/logo/favicon.png"
import Footer from "./footer"
import Header from "./header"

const Layout = ({ data, children, location }) => (
  <div className="page__wrapper">
    <Helmet>
      <html lang="en" />
      <meta
        name="description"
        content={`${data.site.siteMetadata.title}. Blog, portfolio & about.`}
      />
      <title>{data.site.siteMetadata.title}</title>
      <link rel="shortcut icon" href={Favicon} />
    </Helmet>
    <Header pathName={location.pathname} />
    <main className="page__main">
      <section className="content__wrapper u-fill-neutral-white">
        {children}
      </section>
      <Footer />
    </main>
  </div>
)

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

const LayoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default ({ children, location }) => (
  <StaticQuery
    query={LayoutQuery}
    render={(data) => (
      <Layout data={data} children={children} location={location} />
    )}
  />
)
