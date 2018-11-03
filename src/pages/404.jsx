import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";

export default ({ location }) => (
  <Layout location={location}>
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
  </Layout>
);
