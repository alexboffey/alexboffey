import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Content from "../components/content";
import Hero from "../components/hero";

const NotFound = ({ location }) => (
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

NotFound.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default NotFound;
