import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import Header from "./header";
import Footer from "./footer";
import Favicon from "../img/logo/favicon.png";
import "../scss/app.scss";

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
    <Header activePath={location.pathname} />
    <main className="page__main">
      <section className="content__wrapper u-fill-neutral-white">
        {children}
      </section>
      <Footer />
    </main>
  </div>
);

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

const LayoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default ({ children, location }) => (
  <StaticQuery
    query={LayoutQuery}
    render={data => (
      <Layout data={data} children={children} location={location} />
    )}
  />
);
