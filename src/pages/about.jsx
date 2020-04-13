import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"

import Content from "../components/content"
import Hero from "../components/hero"
import Layout from "../components/layout"

const AboutPage = ({ data, location }) => (
  <Layout location={location}>
    <Helmet title={`${data.site.siteMetadata.title} | About`} />
    <Hero title="About" hasBorder />
    <Content>
      <header>
        <h2 className="h1">
          Hi, I&apos;m Alex.{" "}
          <span role="img" aria-label="Waving emoji.">
            👋
          </span>
        </h2>
      </header>
      <section>
        <p>
          Thanks for checking out my blog!
          <br />
          I&apos;m currently working at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.concentra.co.uk/"
          >
            Concentra Analytics
          </a>{" "}
          in London as a JavaScript Developer.
        </p>
      </section>
      <footer className="u-section-xs-top">
        <p>
          If you want to say hi, feel free to contact me via{" "}
          <a href="mailto:alex@alexboffey.co.uk" title="My email">
            Email
          </a>
          ,{" "}
          <a href="https://www.twitter.com/alexboffey" title="My Twitter">
            Twitter
          </a>{" "}
          or{" "}
          <a href="https://www.linkedin.com/in/alexboffey/" title="My LinkedIn">
            LinkedIn
          </a>
          .
        </p>
      </footer>
    </Content>
  </Layout>
)

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
