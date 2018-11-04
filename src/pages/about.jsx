import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";

export default ({ data, location }) => (
  <Layout location={location}>
    <Helmet title={`${data.site.siteMetadata.title} | About`} />
    <Hero title="About" hasBorder />
    <Content>
      <header>
        <h2 className="h1">Hi, I'm Alex.</h2>
      </header>
      <section>
        <p>
          Currently working at{" "}
          <a href="https://www.concentra.co.uk/">Concentra Analytics</a> in
          London as a Junior Developer.
        </p>
        <p>I'm into all things JavaScript, CSS and Music too!</p>
      </section>
      <footer className="u-section-xs">
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
);

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
