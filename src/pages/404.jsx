import React from "react";
import Link from "gatsby-link";
import Wrapper from "../layouts/wrapper";
import Content from "../layouts/content";
import Hero from "../components/hero";

export default () => (
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
);
