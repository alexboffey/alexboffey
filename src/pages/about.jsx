import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";

const AboutQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const About = ({ data, location }) => (
  <Layout location={location}>
    <Wrapper>
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
            London as a Junior Developer. I love all things JavaScript, CSS and
            music too!
          </p>
        </section>
        <footer className="u-section-xs">
          <p>
            If you want to say hello, you can connect with me via{" "}
            <a href="mailto:alex@alexboffey.co.uk" title="My email">
              Email
            </a>
            ,{" "}
            <a href="https://www.twitter.com/alexboffey" title="My Twitter">
              Twitter
            </a>{" "}
            or{" "}
            <a
              href="https://www.linkedin.com/in/alexboffey/"
              title="My LinkedIn"
            >
              LinkedIn
            </a>
            .
          </p>
        </footer>
      </Content>
    </Wrapper>
  </Layout>
);

export default ({ location }) => (
  <StaticQuery
    query={AboutQuery}
    render={data => <About data={data} location={location} />}
  />
);
