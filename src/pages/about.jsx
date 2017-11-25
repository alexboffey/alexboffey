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
                <p>Chambray cliche kogi af man braid actually. Freegan authentic banh mi intelligentsia mustache health goth knausgaard butcher squid ennui tofu sriracha. Brooklyn next level blue bottle deep v affogato skateboard hella craft beer, irony prism intelligentsia poke readymade blog ramps. Mixtape migas scenester cray, freegan pickled cardigan taiyaki put a bird on it pork belly deep v pour-over selfies four dollar toast meh. Fam helvetica health goth la croix everyday carry banh mi. Readymade intelligentsia knausgaard, farm-to-table umami single-origin coffee messenger bag polaroid mumblecore salvia.</p>
                <p>Selfies kale chips health goth fashion axe locavore gochujang. Selvage cardigan chillwave meggings adaptogen brunch heirloom synth lyft. Irony street art woke snackwave lo-fi. You probably haven't heard of them trust fund synth, gochujang pickled disrupt cred palo santo live-edge direct trade XOXO listicle gastropub aesthetic. Migas fixie direct trade trust fund.</p>
            </section>
            <footer className="u-section-xs">
                <p>If you're interested in working together or just fancy saying hello, feel free to contact me via <a href="mailto:alex@alexboffey.co.uk" title="My email">Email</a>, <a href="https://www.twitter.com/alexboffey" title="My Twitter">Twitter</a> or <a href="https://www.linkedin.com/in/alexboffey/" title="My LinkedIn">LinkedIn</a>.</p>
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
