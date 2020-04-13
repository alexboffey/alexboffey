import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Content from "../components/content"
import Hero from "../components/hero"
import Layout from "../components/layout"

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
)

NotFound.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default NotFound
