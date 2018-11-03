import React from "react";
import Link from "gatsby-link";
import Layout from "../components/layout";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";

export default ({location}) => (
  <Layout location={location}>
    <Wrapper>
      <Hero
        title="404"
        subtitle="Unfortunately, this page does not exist!"
        hasBorder
      />

      <Content>
        <p>
          Here's a link back to the <Link to="/">front page</Link>.
        </p>
      </Content>
    </Wrapper>
  </Layout>
);
