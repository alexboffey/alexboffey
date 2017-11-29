import React from 'react'
import Helmet from 'react-helmet'

import Wrapper from '../layouts/wrapper'
import Content from '../layouts/content'

import Hero from '../components/hero'

export default ({ data }) =>
    <Wrapper>
        <Helmet title={`${data.site.siteMetadata.title} | About`} />

        <Hero title="About" hasBorder />

        <Content>
            <header>
                <h2 className="h1">Hello, my name is Alex.</h2>
            </header>
            <section>
                <p>I'm a front-end developer living in Staffordshire, UK.</p>
                <p>After graduating from University, I started as an intern at <a href="https://www.iweb.co.uk/" rel="noopener noreferrer" target="_blank">iWeb</a> where I now currently work full time. As part of the development team in a digital agency environment, my role as a front-end developer contributes to the maintenance and development of a wide array of <i>Magento</i> &amp; <i>Wordpress</i> projects.</p>
                <p>My skillset centres around the cornerstones of the front-end web:</p>
                <ul>
                    <li>Semantic, accessible markup</li>
                    <li>Robust, structured styles</li>
                    <li>Intuitive user experiences</li>
                    <li>Efficient, performant client-side scripting</li>
                </ul>
                <p>My interests span outside of the front-end, they include the likes of <i>Laravel</i>, <i>Node</i> and <i>React Native</i>. However, I'm especially interested in <i>maintainable CSS architecture</i>, <i>new approaches CSS</i> as well as <i>the modern JavaScript world.</i></p>
            </section>
            <footer className="u-section-xs">
                <p>If you fancy a chat, feel free to contact me via <a href="mailto:alex@alexboffey.co.uk" title="My email">Email</a>, <a href="https://www.twitter.com/alexboffey" title="My Twitter">Twitter</a> or <a href="https://www.linkedin.com/in/alexboffey/" title="My LinkedIn">LinkedIn</a>.</p>
            </footer>
        </Content>
    </Wrapper>

export const query = graphql`
    query AboutQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
